package com.example.PetCare.booking.marketplace.service;



import com.example.PetCare.booking.marketplace.domain.Order;
import com.example.PetCare.booking.marketplace.domain.OrderStatus;
import com.example.PetCare.booking.marketplace.dto.CreateOrderRequest;
import com.example.PetCare.booking.marketplace.dto.OrderTrackingResponse;
import com.example.PetCare.booking.marketplace.dto.RazorpayOrderResponse;
import com.example.PetCare.booking.marketplace.dto.VerifyPaymentRequest;

import java.util.List;
import java.util.UUID;

public interface OrderService {

    RazorpayOrderResponse createOrder(UUID userId, CreateOrderRequest request) throws Exception;

    void verifyAndCreateOrder(UUID userId, VerifyPaymentRequest request) throws Exception;

    List<Order> getMyOrders(UUID userId);

    OrderTrackingResponse getOrderTracking(UUID userId, UUID orderId);

    void confirmDelivery(UUID userId, UUID orderId);

    void createOrderAfterPayment(UUID contextId);

}