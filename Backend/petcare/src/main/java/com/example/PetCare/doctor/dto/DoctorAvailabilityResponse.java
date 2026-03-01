package com.example.PetCare.doctor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@AllArgsConstructor
public class DoctorAvailabilityResponse {

    private UUID id;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String status;
}