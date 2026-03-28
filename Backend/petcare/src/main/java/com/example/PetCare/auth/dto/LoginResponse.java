package com.example.PetCare.auth.dto;

import com.example.PetCare.user.domain.Role;
import lombok.Data;

@Data
public class LoginResponse {

    private String token;
    private Role role;
    public LoginResponse(String token, Role role) {
        this.token = token;
        this.role = role;
    }
}
