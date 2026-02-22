package com.example.PetCare.auth.service;

import com.example.PetCare.auth.dto.LoginRequest;
import com.example.PetCare.auth.dto.LoginResponse;
import com.example.PetCare.auth.dto.RegisterRequest;
import com.example.PetCare.user.domain.User;

import java.util.UUID;

public interface AuthService {
    User register(RegisterRequest request);

    String verifyOtp(UUID userId, String otp);

    String resendOtp(UUID userId);

    LoginResponse login(LoginRequest request);
}