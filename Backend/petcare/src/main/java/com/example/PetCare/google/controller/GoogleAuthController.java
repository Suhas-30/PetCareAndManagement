package com.example.PetCare.google.controller;

import com.example.PetCare.google.dto.GoogleAuthRequest;
import com.example.PetCare.google.service.GoogleOAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/google")
@RequiredArgsConstructor
public class GoogleAuthController {

    private final GoogleOAuthService googleOAuthService;

    @PostMapping
    public ResponseEntity<?> authenticate(@RequestBody GoogleAuthRequest request) {
        return ResponseEntity.ok(googleOAuthService.authenticate(request.getCode()));
    }
}