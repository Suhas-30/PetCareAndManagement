package com.example.PetCare.user.dto;

import com.example.PetCare.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class DoctorListResponse {

    private UUID id;
    private String fullName;
    private String email;

    public static DoctorListResponse from(User user) {
        return new DoctorListResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail()
        );
    }
}