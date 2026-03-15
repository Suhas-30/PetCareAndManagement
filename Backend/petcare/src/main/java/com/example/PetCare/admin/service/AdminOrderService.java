package com.example.PetCare.admin.service;

import com.example.PetCare.admin.dto.AdminOrderDetailsResponse;
import com.example.PetCare.booking.marketplace.domain.Order;
import com.example.PetCare.booking.marketplace.domain.OrderStatus;

import java.util.List;
import java.util.UUID;

public interface AdminOrderService { 

    /* ---------- ADMIN ---------- */

    List<Order> getAllOrdersForAdmin();

    AdminOrderDetailsResponse getOrderByIdForAdmin(UUID orderId);

    void updateOrderStatus(UUID orderId, OrderStatus status);

    OrderStatus getNextStatus(UUID orderId);

}