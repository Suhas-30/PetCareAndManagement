package com.example.PetCare.admin.service.impl;

import com.example.PetCare.admin.dto.AdminOrderDetailsResponse;
import com.example.PetCare.admin.service.AdminOrderService;
import com.example.PetCare.booking.marketplace.address.domain.Address;
import com.example.PetCare.booking.marketplace.address.repository.AddressRepository;
import com.example.PetCare.booking.marketplace.domain.Order;
import com.example.PetCare.booking.marketplace.domain.OrderItem;
import com.example.PetCare.booking.marketplace.domain.OrderStatus;
import com.example.PetCare.booking.marketplace.domain.Product;
import com.example.PetCare.booking.marketplace.repository.OrderItemRepository;
import com.example.PetCare.booking.marketplace.repository.OrderRepository;
import com.example.PetCare.booking.marketplace.repository.ProductRepository;
import com.example.PetCare.common.exception.AppException;
import com.example.PetCare.user.domain.User;
import com.example.PetCare.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class AdminOrderServiceImpl implements AdminOrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    @Override
    public List<Order> getAllOrdersForAdmin() {

        return orderRepository.findAll().stream()
                .filter(o ->
                        o.getStatus() == OrderStatus.PAID ||
                                o.getStatus() == OrderStatus.SHIPPING ||
                                o.getStatus() == OrderStatus.OUT_FOR_DELIVERY
                )
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .toList();
    }

    @Override
    public AdminOrderDetailsResponse getOrderByIdForAdmin(UUID orderId) {

        /* ---------- ORDER ---------- */
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException("Order Not Found"));

        /* ---------- USER ---------- */
        User user = userRepository.findById(order.getUserId())
                .orElseThrow(() -> new AppException("User Not Found"));

        /* ---------- ADDRESS ---------- */
        Address address = addressRepository.findById(order.getAddressId())
                .orElseThrow(() -> new AppException("Address Not Found"));

        /* ---------- PRODUCTS ---------- */
        List<OrderItem> orderItems = orderItemRepository.findByOrderId(orderId);

        List<AdminOrderDetailsResponse.Item> items =
                orderItems.stream()
                        .map(i -> {

                            Product product = productRepository.findById(i.getProductId())
                                    .orElseThrow(() -> new AppException("Product not found"));

                            return AdminOrderDetailsResponse.Item.builder()
                                    .productName(product.getName())   // ✅ correct
                                    .quantity(i.getQuantity())
                                    .price(i.getPrice())
                                    .total(i.getPrice()
                                            .multiply(BigDecimal.valueOf(i.getQuantity())))
                                    .build();
                        })
                        .toList();

        /* ---------- RESPONSE ---------- */
        return AdminOrderDetailsResponse.builder()
                .orderId(order.getId().toString())
                .createdAt(order.getCreatedAt())
                .status(order.getStatus().name())
                .totalAmount(order.getTotalAmount())

                /* USER */
                .userName(user.getFullName())
                .email(user.getEmail())
                .phone(address.getPhone())

                /* ADDRESS */
                .addressLine(address.getLine1())   // use line1 (your entity field)
                .city(address.getCity())
                .pincode(address.getPincode())

                /* PRODUCTS */
                .items(items)

                .build();
    }

    @Override
    public void updateOrderStatus(UUID orderId, OrderStatus status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException("Order not found"));

        /* ---------- VALIDATION FLOW ---------- */

        if (order.getStatus() == OrderStatus.PAID && status == OrderStatus.SHIPPING) {
            order.setStatus(OrderStatus.SHIPPING);

        } else if (order.getStatus() == OrderStatus.SHIPPING && status == OrderStatus.OUT_FOR_DELIVERY) {
            order.setStatus(OrderStatus.OUT_FOR_DELIVERY);

        } else {
            throw new AppException("Invalid status transition");
        }

        order.setUpdatedAt(LocalDateTime.now());

        orderRepository.save(order);
    }

    @Override
    public OrderStatus getNextStatus(UUID orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException("Order not found"));

        return switch (order.getStatus()) {

            case PAID -> OrderStatus.SHIPPING;

            case SHIPPING -> OrderStatus.OUT_FOR_DELIVERY;

            case OUT_FOR_DELIVERY -> OrderStatus.COMPLETED;

            default -> null; // no next status
        };
    }

}
