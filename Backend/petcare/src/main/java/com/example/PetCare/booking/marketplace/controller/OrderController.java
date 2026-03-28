package com.example.PetCare.booking.marketplace.controller;

import com.example.PetCare.booking.marketplace.dto.CreateOrderRequest;
import com.example.PetCare.booking.marketplace.dto.RazorpayOrderResponse;
import com.example.PetCare.booking.marketplace.dto.VerifyPaymentRequest;
import com.example.PetCare.booking.marketplace.service.OrderService;
import com.example.PetCare.common.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/user/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    /* ================= CREATE RAZORPAY ORDER ================= */

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestBody CreateOrderRequest req
    ) throws Exception {

        RazorpayOrderResponse response =
                orderService.createOrder(user.getId(), req);

        return ResponseEntity.ok(Map.of("data", response));
    }

    /* ================= VERIFY PAYMENT ================= */

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestBody VerifyPaymentRequest req
    ) throws Exception {

        orderService.verifyAndCreateOrder(user.getId(), req);

        return ResponseEntity.ok(Map.of("message", "Order placed successfully"));
    }

    /* ================= My Orders ================= */
    @GetMapping("/my")
    public ResponseEntity<?> getMyOrders(
            @AuthenticationPrincipal UserPrincipal user
    ) {

        return ResponseEntity.ok(
                Map.of("data", orderService.getMyOrders(user.getId()))
        );
    }

    @GetMapping("/{id}/tracking")
    public ResponseEntity<?> getOrderTracking(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable UUID id
    ) {

        return ResponseEntity.ok(
                Map.of("data", orderService.getOrderTracking(user.getId(), id))
        );
    }

    @PutMapping("/{id}/confirm-delivery")
    public ResponseEntity<?> confirmDelivery(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable UUID id
    ) {

        orderService.confirmDelivery(user.getId(), id);

        return ResponseEntity.ok(
                Map.of("message", "Order marked as delivered")
        );
    }

}