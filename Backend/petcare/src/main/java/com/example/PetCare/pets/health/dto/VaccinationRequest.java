package com.example.PetCare.pets.health.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class VaccinationRequest {

    private String vaccineName;
    private Integer totalDoses;
    private Integer completedDoses;
    private LocalDate lastDoseDate; // comes from frontend
}