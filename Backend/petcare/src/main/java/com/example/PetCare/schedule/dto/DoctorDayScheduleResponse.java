package com.example.PetCare.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@AllArgsConstructor
public class DoctorDayScheduleResponse {

    private LocalDate date;
    private Boolean isWorking;
    private List<DoctorSessionResponse> sessions;
}