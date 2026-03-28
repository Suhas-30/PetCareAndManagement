package com.example.PetCare.auth.controller;

import com.example.PetCare.auth.dto.*;
import com.example.PetCare.auth.service.AuthService;
import com.example.PetCare.common.response.ApiResponse;
import com.example.PetCare.common.security.JwtService;
import com.example.PetCare.common.security.UserPrincipal;
import com.example.PetCare.user.domain.User;
import com.example.PetCare.user.repository.UserRepository;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public AuthController(
            AuthService authService,
            JwtService jwtService,
            UserRepository userRepository
    ) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisterResponse>> register(
            @RequestBody @Valid RegisterRequest request
    ) {
        User user = authService.register(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "User registered. Please verify OTP.",
                        new RegisterResponse(user.getId())
                )
        );
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @RequestBody @Valid LoginRequest request
    ) {
        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Login successful", response)
        );
    }

    // ✅ VERIFY OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<Void>> verifyEmailOtp(
            @RequestBody @Valid VerifyOtpRequest request
    ) {
        String message =
                authService.verifyOtp(request.getUserId(), request.getOtp());

        return ResponseEntity.ok(
                new ApiResponse<>(true, message, null)
        );
    }

    // ✅ RESEND OTP
    @PostMapping("/resend-otp")
    public ResponseEntity<ApiResponse<Void>> resendOtp(
            @RequestBody @Valid ResendOtpRequest request
    ) {
        String message =
                authService.resendOtp(request.getUserId());

        return ResponseEntity.ok(
                new ApiResponse<>(true, message, null)
        );
    }

    // =========================================================
    // ✅ NEW — REFRESH JWT (VERY IMPORTANT)
    // =========================================================
    @GetMapping("/refresh")
    public ResponseEntity<ApiResponse<String>> refreshToken(
            @AuthenticationPrincipal UserPrincipal principal
    ) {

        // user extracted from current JWT
        String email = principal.getUsername();

        // ALWAYS fetch latest role from DB
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // generate fresh token with updated role
        String newToken = jwtService.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole()
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Token refreshed",
                        newToken
                )
        );
    }
}