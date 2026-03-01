package com.example.PetCare.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class DoctorScheduleDateResponse {

    private LocalDate date;
    private Boolean isWorking;
}