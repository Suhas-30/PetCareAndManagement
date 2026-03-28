package com.example.PetCare.payment.handler.impl;

import com.example.PetCare.booking.marketplace.service.OrderService;
import com.example.PetCare.payment.domain.PaymentContextType;
import com.example.PetCare.payment.handler.PaymentSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MarketplacePaymentSuccessHandler implements PaymentSuccessHandler {

    private final OrderService orderService;

    @Override
    public PaymentContextType getType() {
        return PaymentContextType.MARKETPLACE;
    }

    @Override
    public void handleSuccess(UUID contextId) {
        orderService.createOrderAfterPayment(contextId);
    }
}
