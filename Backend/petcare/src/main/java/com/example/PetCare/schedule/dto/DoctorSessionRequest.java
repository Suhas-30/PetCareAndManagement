package com.example.PetCare.schedule.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
public class DoctorSessionRequest {

    private LocalTime startTime;
    private LocalTime endTime;
}