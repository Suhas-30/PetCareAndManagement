package com.example.PetCare.booking.marketplace.service.impl;

import com.example.PetCare.booking.marketplace.domain.*;
import com.example.PetCare.booking.marketplace.dto.CreateOrderRequest;
import com.example.PetCare.booking.marketplace.dto.OrderTrackingResponse;
import com.example.PetCare.booking.marketplace.dto.RazorpayOrderResponse;
import com.example.PetCare.booking.marketplace.dto.VerifyPaymentRequest;
import com.example.PetCare.booking.marketplace.repository.*;
import com.example.PetCare.booking.marketplace.service.OrderService;
import com.example.PetCare.common.exception.AppException;
import com.example.PetCare.notification.service.NotificationService;
import com.example.PetCare.payment.domain.PaymentContextType;
import com.example.PetCare.payment.service.RazorpayService;
import com.example.PetCare.user.repository.UserRepository;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final RazorpayService razorpayService;
    private final OrderDraftRepository orderDraftRepository;

    private final NotificationService notificationService;
    private final UserRepository userRepository;

    /* ================================================= */
    /* STEP 1 → CREATE RAZORPAY ORDER (BEFORE PAYMENT)  */
    /* ================================================= */

    @Override
    public RazorpayOrderResponse createOrder(UUID userId, CreateOrderRequest req) throws Exception {

        List<Product> products = productRepository.findAllById(req.getItems());

        if (products.isEmpty()) {
            throw new AppException("Products not found");
        }

        for (Product p : products) {
            if (p.getStock() <= 0) {
                throw new AppException("Stock not available: " + p.getName());
            }
        }

        int totalAmount = products.stream()
                .mapToInt(p -> p.getPrice().intValue())
                .sum();

        UUID contextId = UUID.randomUUID();

        OrderDraft draft = OrderDraft.builder()
                .id(contextId)
                .userId(userId)
                .addressId(req.getAddressId())
                .itemsJson(new ObjectMapper().writeValueAsString(req.getItems()))
                .build();

        orderDraftRepository.save(draft);

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

        List<Product> products = productRepository.findAllById(req.getItems());

        if (products.isEmpty()) {
            throw new AppException("Products not found");
        }

        BigDecimal total = BigDecimal.ZERO;

        for (Product p : products) {
            total = total.add(p.getPrice());
        }

        Order order = Order.builder()
                .userId(userId)
                .addressId(req.getAddressId())
                .status(OrderStatus.PAID)
                .razorpayOrderId(req.getRazorpayOrderId())
                .razorpayPaymentId(req.getRazorpayPaymentId())
                .totalAmount(total)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        orderRepository.save(order);

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

        /* ✅ SEND EMAIL (SAFE - WON'T BREAK FLOW) */

        try {
            String userEmail = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"))
                    .getEmail();

            StringBuilder productList = new StringBuilder();

            for (Product p : products) {
                productList.append("- ").append(p.getName()).append("\n");
            }

            String subject = "Order Confirmed - Smart Pet Care";

            String message =
                    "Your order has been placed successfully.\n\n" +
                            "Order ID: " + order.getId() + "\n\n" +
                            "Items:\n" + productList + "\n" +
                            "Total Amount: ₹" + total + "\n\n" +
                            "You can track your order inside the app.\n\n" +
                            "Smart Pet Care Team";

            notificationService.send(userEmail, subject, message);

        } catch (Exception e) {
            log.error("Email sending failed but order created successfully: {}", e.getMessage());
        }
    }

    /* ================================================= */

    @Override
    public List<Order> getMyOrders(UUID userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    public OrderTrackingResponse getOrderTracking(UUID userId, UUID orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException("Order not found"));

        if (!order.getUserId().equals(userId)) {
            throw new AppException("Unauthorized access");
        }

        List<OrderItem> orderItems = orderItemRepository.findByOrderId(orderId);

        List<OrderTrackingResponse.Item> items =
                orderItems.stream().map(i -> {

                    Product product = productRepository.findById(i.getProductId())
                            .orElseThrow(() -> new AppException("Product not found"));

                    return OrderTrackingResponse.Item.builder()
                            .productName(product.getName())
                            .quantity(i.getQuantity())
                            .build();
                }).toList();

        return OrderTrackingResponse.builder()
                .status(order.getStatus().name())
                .createdAt(order.getCreatedAt())
                .items(items)
                .build();
    }

    @Override
    public void confirmDelivery(UUID userId, UUID orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException("Order not found"));

        if (!order.getUserId().equals(userId)) {
            throw new AppException("Unauthorized");
        }

        if (order.getStatus() != OrderStatus.OUT_FOR_DELIVERY) {
            throw new AppException("Order not eligible for confirmation");
        }

        order.setStatus(OrderStatus.COMPLETED);
        order.setUpdatedAt(LocalDateTime.now());

        orderRepository.save(order);
    }

    @Override
    public void createOrderAfterPayment(UUID contextId) {
    }
}