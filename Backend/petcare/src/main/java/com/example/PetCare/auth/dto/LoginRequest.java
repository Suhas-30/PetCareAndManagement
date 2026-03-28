package com.example.PetCare.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    @Email(message = "Invalid email")
    @NotBlank(message = "Email Required")
    private String email;

    @NotBlank(message = "Password required")
    private String password;
}
