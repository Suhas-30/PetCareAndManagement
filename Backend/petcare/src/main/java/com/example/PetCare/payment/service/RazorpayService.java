package com.example.PetCare.payment.service;

import com.example.PetCare.payment.domain.PaymentContextType;

import java.util.UUID;

public interface RazorpayService {

    String createOrder(UUID contextId,
                       PaymentContextType contextType,
                       int amount) throws Exception;

    boolean verifyPayment(String razorpayOrderId,
                          String razorpayPaymentId,
                          String razorpaySignature) throws Exception;
}