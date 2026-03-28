package com.example.PetCare.auth.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class RegisterResponse {
    private UUID userId;
    public RegisterResponse(UUID userId){
        this.userId = userId;
    }
}
