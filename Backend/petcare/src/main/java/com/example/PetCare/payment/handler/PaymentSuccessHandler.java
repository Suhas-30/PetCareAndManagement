package com.example.PetCare.payment.handler;

import com.example.PetCare.payment.domain.PaymentContextType;

import java.util.UUID;

public interface PaymentSuccessHandler {

    PaymentContextType getType();

    void handleSuccess(UUID contextId);
}