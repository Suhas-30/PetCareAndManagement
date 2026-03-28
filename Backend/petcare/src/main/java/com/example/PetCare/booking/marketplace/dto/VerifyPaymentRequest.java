package com.example.PetCare.booking.marketplace.dto;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class VerifyPaymentRequest {

    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;

    private List<UUID> items;
    private UUID addressId;
}