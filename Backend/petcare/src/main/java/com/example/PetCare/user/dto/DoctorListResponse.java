package com.example.PetCare.user.dto;

import com.example.PetCare.doctor.domain.DoctorApplication;
import com.example.PetCare.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class DoctorListResponse {

    private UUID doctorId;
    private String fullName;
    private String email;

    public static DoctorListResponse from(DoctorApplication doctor) {
        return new DoctorListResponse(
                doctor.getId(),
                doctor.getUser().getFullName(),
                doctor.getUser().getEmail()
        );
    }
}