package com.example.PetCare.doctor.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class PrescriptionResponse {

    private UUID id;
    private UUID appointmentId;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}