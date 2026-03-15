package com.example.PetCare.payment.service.impl;

import com.example.PetCare.payment.domain.Payment;
import com.example.PetCare.payment.domain.PaymentStatus;
import com.example.PetCare.payment.handler.PaymentSuccessHandler;
import com.example.PetCare.payment.repository.PaymentRepository;
import com.example.PetCare.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final List<PaymentSuccessHandler> handlers;

    @Override
    public void handleSuccess(String razorpayOrderId, String razorpayPaymentId) {

        Payment payment = paymentRepository.findByRazorpayOrderId(razorpayOrderId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setRazorpayPaymentId(razorpayPaymentId);
        paymentRepository.save(payment);

        // 👉 CALL HANDLER (loose coupling)
        handlers.stream()
                .filter(h -> h.getType() == payment.getContextType())
                .findFirst()
                .ifPresent(h -> h.handleSuccess(payment.getContextId()));
    }

    @Override
    public void markFailed(String razorpayOrderId) {

        paymentRepository.findByRazorpayOrderId(razorpayOrderId).ifPresent(payment -> {
            payment.setStatus(PaymentStatus.FAILED);
            paymentRepository.save(payment);
        });
    }
}