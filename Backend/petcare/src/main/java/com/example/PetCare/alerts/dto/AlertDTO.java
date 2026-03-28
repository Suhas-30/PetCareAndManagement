package com.example.PetCare.alerts.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class AlertDTO {

    private UUID referenceId;   // vaccinationId / appointmentId / orderId

    private String type;        // VACCINATION / APPOINTMENT / ORDER

    private String title;       // message shown in navbar

    private String redirectUrl; // where frontend should navigate

    private boolean read;       // future use

    private LocalDateTime createdAt;
}