package com.example.PetCare.payment.controller;

import com.example.PetCare.common.security.UserPrincipal;
import com.example.PetCare.payment.domain.PaymentContextType;
import com.example.PetCare.payment.service.PaymentService;
import com.example.PetCare.payment.service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/user/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final PaymentService paymentService;

    /* ================= CREATE ORDER ================= */

    @PostMapping("/create-order")
    public Map<String, Object> createOrder(@AuthenticationPrincipal UserPrincipal user,
                                           @RequestBody Map<String, String> req) throws Exception {

        UUID contextId = UUID.fromString(req.get("contextId"));
        PaymentContextType type = PaymentContextType.valueOf(req.get("type"));
        int amount = Integer.parseInt(req.get("amount"));

        // 👉 user available if needed later (audit/logging etc.)
        UUID userId = user.getId();

        String orderJson = razorpayService.createOrder(contextId, type, amount);

        return Map.of("data", new org.json.JSONObject(orderJson).toMap());
    }

    /* ================= VERIFY ================= */

    @PostMapping("/verify")
    public String verify(@RequestBody Map<String, String> data) throws Exception {

        boolean isValid = razorpayService.verifyPayment(
                data.get("razorpay_order_id"),
                data.get("razorpay_payment_id"),
                data.get("razorpay_signature")
        );

        if (!isValid) {
            paymentService.markFailed(data.get("razorpay_order_id"));
            throw new RuntimeException("Payment verification failed");
        }

        paymentService.handleSuccess(
                data.get("razorpay_order_id"),
                data.get("razorpay_payment_id")
        );

        return "ok";
    }
}