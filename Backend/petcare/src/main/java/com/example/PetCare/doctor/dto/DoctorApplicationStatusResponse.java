package com.example.PetCare.doctor.dto;

import lombok.Data;

@Data
public class DoctorApplicationStatusResponse {

    private String status;
    private String rejectReason;
}