package com.example.PetCare.auth.controller;

import com.example.PetCare.auth.dto.*;
import com.example.PetCare.auth.service.AuthService;
import com.example.PetCare.common.response.ApiResponse;
import com.example.PetCare.user.domain.User;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping({"/auth"})
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping({"/register"})
    public ResponseEntity<ApiResponse<RegisterResponse>> register(@RequestBody @Valid RegisterRequest request) {
        User user = this.authService.register(request);
        System.out.println(user.getId());
        return ResponseEntity.ok(new ApiResponse(true, "User registered. Please verify OTP.", new RegisterResponse(user.getId())));
    }

    @PostMapping({"/login"})
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody @Valid LoginRequest request) {
        LoginResponse response = this.authService.login(request);
        return ResponseEntity.ok(new ApiResponse(true, "Login successful", response));
    }

    @PostMapping({"/verify-otp"})
    public ResponseEntity<ApiResponse<Void>> verifyEmailOtp(@RequestBody @Valid VerifyOtpRequest request) {
        String message = this.authService.verifyOtp(request.getUserId(), request.getOtp());
        return ResponseEntity.ok(new ApiResponse(true, message, (Object)null));
    }

    @PostMapping({"/resend-otp"})
    public ResponseEntity<ApiResponse<Void>> resendOtp(@RequestBody @Valid ResendOtpRequest request) {
        String message = this.authService.resendOtp(request.getUserId());
        return ResponseEntity.ok(new ApiResponse(true, message, (Object)null));
    }
}
