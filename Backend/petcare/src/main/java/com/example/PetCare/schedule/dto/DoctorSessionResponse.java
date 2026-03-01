package com.example.PetCare.schedule.dto;

import com.example.PetCare.schedule.enums.AvailabilityStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalTime;

@Getter
@AllArgsConstructor
public class DoctorSessionResponse {

    private LocalTime startTime;
    private LocalTime endTime;
    private AvailabilityStatus status;
}