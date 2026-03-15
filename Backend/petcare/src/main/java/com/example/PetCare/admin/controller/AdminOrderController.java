package com.example.PetCare.admin.controller;

import com.example.PetCare.admin.dto.AdminOrderDetailsResponse;
import com.example.PetCare.admin.dto.UpdateOrderStatusRequest;
import com.example.PetCare.admin.service.AdminOrderService;
import com.example.PetCare.booking.marketplace.domain.Order;
import com.example.PetCare.booking.marketplace.domain.OrderStatus;
import com.example.PetCare.booking.marketplace.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/admin/orders")
@RequiredArgsConstructor

public class AdminOrderController {

    private final AdminOrderService orderService;

    /* ================= GET ALL ORDERS ================= */

    @GetMapping
    public ResponseEntity<?> getAllOrders() {

        return ResponseEntity.ok(
                Map.of("data", orderService.getAllOrdersForAdmin())
        );
    }

    /* ================= GET ORDER BY ID ================= */

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable UUID id) {
        AdminOrderDetailsResponse order = orderService.getOrderByIdForAdmin(id);

        return ResponseEntity.ok(
                Map.of("data", order)
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable UUID id,
            @RequestBody UpdateOrderStatusRequest req
    ) {

        orderService.updateOrderStatus(id, req.getStatus());

        return ResponseEntity.ok(Map.of("message", "Status updated"));
    }

    @GetMapping("/{id}/next-status")
    public ResponseEntity<?> getNextStatus(@PathVariable UUID id) {

        OrderStatus nextStatus = orderService.getNextStatus(id);

        return ResponseEntity.ok(
                Map.of("data", nextStatus)
        );
    }
}