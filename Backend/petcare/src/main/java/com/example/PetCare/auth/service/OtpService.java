package com.example.PetCare.auth.service;

import com.example.PetCare.auth.domain.EmailOtp;
import com.example.PetCare.user.domain.User;

import java.util.UUID;

public interface OtpService {
    String generateOtp();

    void createAndSendOtp(User user);

    EmailOtp validateOtp(UUID userId, String otp);
}
