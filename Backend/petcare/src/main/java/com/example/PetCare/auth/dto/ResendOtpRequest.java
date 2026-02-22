package com.example.PetCare.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.UUID;

@Data
public class ResendOtpRequest {

    @NotBlank(message = "UserId is required")
    private UUID userId;
}

