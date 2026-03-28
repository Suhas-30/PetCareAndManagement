package com.example.PetCare.doctor.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class UpcomingAppointmentDto {

    private UUID appointmentId;

    private String ownerName;

    private String petName;
    private String species;
    private String breed;
    private Double weight;

    private LocalDate slotDate;
    private LocalTime startTime;
    private LocalTime endTime;

    private String purpose;
    private String mode;

    private List<String> medicalHistory;
}