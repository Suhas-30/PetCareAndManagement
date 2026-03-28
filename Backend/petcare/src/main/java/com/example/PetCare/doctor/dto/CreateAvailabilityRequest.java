package com.example.PetCare.doctor.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class CreateAvailabilityRequest {

    private LocalDate date;

    private LocalTime startTime;
    private LocalTime endTime;

    private String status; // AVAILABLE / BREAK
}
