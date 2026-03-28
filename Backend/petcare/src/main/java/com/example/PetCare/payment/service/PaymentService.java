package com.example.PetCare.payment.service;

public interface PaymentService {

    void handleSuccess(String razorpayOrderId, String razorpayPaymentId);

    void markFailed(String razorpayOrderId);
}