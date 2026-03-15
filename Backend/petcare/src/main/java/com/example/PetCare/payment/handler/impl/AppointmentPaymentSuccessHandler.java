package com.example.PetCare.payment.handler.impl;

import com.example.PetCare.booking.appointment.service.AppointmentService;
import com.example.PetCare.payment.domain.PaymentContextType;
import com.example.PetCare.payment.handler.PaymentSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentPaymentSuccessHandler implements PaymentSuccessHandler {

    private final AppointmentService appointmentService;

    @Override
    public PaymentContextType getType() {
        return PaymentContextType.APPOINTMENT;
    }

    @Override
    public void handleSuccess(UUID contextId) {
        appointmentService.createAfterPayment(contextId);
    }
}
