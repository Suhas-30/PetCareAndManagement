package com.example.PetCare.doctor.dto;

import com.example.PetCare.doctor.domain.DoctorApplication;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class PublicDoctorCardResponse {

    private UUID doctorId;
    private String fullName;
    private String specialization;
    private String clinicName;
    private Integer experience;
    private String city;
    private String consultationType;

    public static PublicDoctorCardResponse from(DoctorApplication da) {
        return new PublicDoctorCardResponse(
                da.getUser().getId(),
                da.getUser().getFullName(),
                da.getSpecialization(),
                da.getClinicName(),
                da.getYearsOfExperience(),
                da.getCity(),
                da.getConsultationType()
        );
    }
}