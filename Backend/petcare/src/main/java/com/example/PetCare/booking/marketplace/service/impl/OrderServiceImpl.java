package com.example.PetCare.booking.marketplace.service.impl;

import com.example.PetCare.booking.marketplace.domain.*;
import com.example.PetCare.booking.marketplace.dto.CreateOrderRequest;
import com.example.PetCare.booking.marketplace.dto.OrderTrackingResponse;
import com.example.PetCare.booking.marketplace.dto.RazorpayOrderResponse;
import com.example.PetCare.booking.marketplace.dto.VerifyPaymentRequest;
import com.example.PetCare.booking.marketplace.repository.OrderDraftRepository;
import com.example.PetCare.booking.marketplace.repository.OrderItemRepository;
import com.example.PetCare.booking.marketplace.repository.OrderRepository;
import com.example.PetCare.booking.marketplace.repository.ProductRepository;

import com.example.PetCare.booking.marketplace.service.OrderService;
import com.example.PetCare.common.exception.AppException;
import com.example.PetCare.payment.domain.PaymentContextType;
import com.example.PetCare.payment.service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import com.fasterxml.jackson.databind.ObjectMapper;
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final RazorpayService razorpayService;
    private final OrderDraftRepository orderDraftRepository;

    /* ================================================= */
    /* STEP 1 → CREATE RAZORPAY ORDER (BEFORE PAYMENT)  */
    /* ================================================= */

    @Override
    public RazorpayOrderResponse createOrder(UUID userId, CreateOrderRequest req) throws Exception {

        /* 1️⃣ Fetch products */
        List<Product> products = productRepository.findAllById(req.getItems());

        if (products.isEmpty()) {
            throw new AppException("Products not found");
        }

        /* 2️⃣ STOCK CHECK */
        for (Product p : products) {
            if (p.getStock() <= 0) {
                throw new AppException("Stock not available: " + p.getName());
            }
        }

        /* 3️⃣ CALCULATE TOTAL */
        int totalAmount = products.stream()
                .mapToInt(p -> p.getPrice().intValue())
                .sum();

        /* 4️⃣ CREATE RAZORPAY ORDER */
        UUID contextId = UUID.randomUUID();

        /* 👉 save draft before payment */
        OrderDraft draft = OrderDraft.builder()
                .id(contextId)
                .userId(userId)
                .addressId(req.getAddressId())
                .itemsJson(new ObjectMapper().writeValueAsString(req.getItems()))
                .build();

        orderDraftRepository.save(draft);

        /* 👉 create payment order */
        String orderJson = razorpayService.createOrder(
                contextId,
                PaymentContextType.MARKETPLACE,
                totalAmount
        );

        return RazorpayOrderResponse.fromJson(orderJson);
    }

    /* ================================================= */
    /* STEP 2 → VERIFY + CREATE ORDER (AFTER PAYMENT)   */
    /* ================================================= */

    @Override
    public void verifyAndCreateOrder(UUID userId, VerifyPaymentRequest req) throws Exception {

        /* 1️⃣ VERIFY PAYMENT */



        /* 2️⃣ FETCH PRODUCTS */
        List<Product> products = productRepository.findAllById(req.getItems());

        if (products.isEmpty()) {
            throw new AppException("Products not found");
        }

        /* 3️⃣ CALCULATE TOTAL FIRST */
        BigDecimal total = BigDecimal.ZERO;

        for (Product p : products) {
            total = total.add(p.getPrice());
        }

        /* 4️⃣ CREATE ORDER (NOW CORRECT) */
        Order order = Order.builder()
                .userId(userId)
                .addressId(req.getAddressId())
                .status(OrderStatus.PAID)
                .razorpayOrderId(req.getRazorpayOrderId())
                .razorpayPaymentId(req.getRazorpayPaymentId())
                .totalAmount(total)   // ✅ IMPORTANT FIX
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        orderRepository.save(order);

        /* 5️⃣ CREATE ORDER ITEMS + REDUCE STOCK */
        for (Product p : products) {

            OrderItem item = OrderItem.builder()
                    .orderId(order.getId())
                    .productId(p.getId())
                    .quantity(1)
                    .price(p.getPrice())
                    .build();

            orderItemRepository.save(item);

            /* reduce stock */
            p.setStock(p.getStock() - 1);
            productRepository.save(p);
        }
    }

    @Override
    public List<Order> getMyOrders(UUID userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }


    @Override
    public OrderTrackingResponse getOrderTracking(UUID userId, UUID orderId) {

        /* ---------- ORDER ---------- */
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException("Order not found"));

        /* SECURITY CHECK (important) */
        if (!order.getUserId().equals(userId)) {
            throw new AppException("Unauthorized access");
        }

        /* ---------- ITEMS ---------- */
        List<OrderItem> orderItems = orderItemRepository.findByOrderId(orderId);

        List<OrderTrackingResponse.Item> items =
                orderItems.stream()
                        .map(i -> {

                            Product product = productRepository.findById(i.getProductId())
                                    .orElseThrow(() -> new AppException("Product not found"));

                            return OrderTrackingResponse.Item.builder()
                                    .productName(product.getName())
                                    .quantity(i.getQuantity())
                                    .build();
                        })
                        .toList();

        /* ---------- STATUS DATES ---------- */
        LocalDateTime paidAt = order.getStatus().ordinal() >= OrderStatus.PAID.ordinal()
                ? order.getUpdatedAt()
                : null;

        LocalDateTime shippedAt = order.getStatus().ordinal() >= OrderStatus.SHIPPING.ordinal()
                ? order.getUpdatedAt()
                : null;

        LocalDateTime outForDeliveryAt = order.getStatus().ordinal() >= OrderStatus.OUT_FOR_DELIVERY.ordinal()
                ? order.getUpdatedAt()
                : null;

        LocalDateTime completedAt = order.getStatus() == OrderStatus.COMPLETED
                ? order.getUpdatedAt()
                : null;

        /* ---------- RESPONSE ---------- */
        return OrderTrackingResponse.builder()
                .status(order.getStatus().name())
                .createdAt(order.getCreatedAt())
                .paidAt(paidAt)
                .shippedAt(shippedAt)
                .outForDeliveryAt(outForDeliveryAt)
                .completedAt(completedAt)
                .items(items)
                .build();
    }

    @Override
    public void confirmDelivery(UUID userId, UUID orderId) {

        /* ---------- ORDER ---------- */
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException("Order not found"));

        /* ---------- SECURITY CHECK ---------- */
        if (!order.getUserId().equals(userId)) {
            throw new AppException("Unauthorized");
        }

        /* ---------- STATUS CHECK (IMPORTANT) ---------- */
        if (order.getStatus() != OrderStatus.OUT_FOR_DELIVERY) {
            throw new AppException("Order not eligible for confirmation");
        }

        /* ---------- UPDATE ---------- */
        order.setStatus(OrderStatus.COMPLETED);
        order.setUpdatedAt(LocalDateTime.now());

        orderRepository.save(order);
    }

    @Override
    public void createOrderAfterPayment(UUID contextId) {

        /* 1️⃣ FETCH DRAFT */
        OrderDraft draft = orderDraftRepository.findById(contextId)
                .orElseThrow(() -> new RuntimeException("Order draft not found"));

        /* 2️⃣ FETCH PRODUCTS */
        List<UUID> productIds;
        try {
            productIds = new ObjectMapper().readValue(
                    draft.getItemsJson(),
                    new com.fasterxml.jackson.core.type.TypeReference<List<UUID>>() {}
            );
        } catch (Exception e) {
            throw new RuntimeException("Invalid draft items");
        }

        List<Product> products = productRepository.findAllById(productIds);

        if (products.isEmpty()) {
            throw new RuntimeException("Products not found");
        }

        /* 3️⃣ CALCULATE TOTAL */
        BigDecimal total = BigDecimal.ZERO;

        for (Product p : products) {
            total = total.add(p.getPrice());
        }

        /* 4️⃣ CREATE ORDER */
        Order order = Order.builder()
                .userId(draft.getUserId())
                .addressId(draft.getAddressId())
                .status(OrderStatus.PAID)
                .totalAmount(total)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        orderRepository.save(order);

        /* 5️⃣ CREATE ITEMS + REDUCE STOCK */
        for (Product p : products) {

            OrderItem item = OrderItem.builder()
                    .orderId(order.getId())
                    .productId(p.getId())
                    .quantity(1)
                    .price(p.getPrice())
                    .build();

            orderItemRepository.save(item);

            p.setStock(p.getStock() - 1);
            productRepository.save(p);
        }

        /* 6️⃣ DELETE DRAFT */
        orderDraftRepository.deleteById(contextId);
    }


}