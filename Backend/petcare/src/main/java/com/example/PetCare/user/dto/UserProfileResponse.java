package com.example.PetCare.user.dto;

import java.util.UUID;

public record UserProfileResponse(
        UUID id,
        String fullName,
        String email,
        String role
) {
}
