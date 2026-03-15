package com.example.PetCare.doctor.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class CreateSlotRequest {

    private LocalDate slotDate;
    private LocalTime startTime;
    private int durationMinutes;
    private BigDecimal consultingFee;
}