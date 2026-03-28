package com.example.PetCare.auth.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;
@Data
public class VerifyOtpRequest {

    @NotNull(message = "UserId is required")
    private UUID userId;

    @NotNull(message = "OTP is required")
    private String otp;
}

