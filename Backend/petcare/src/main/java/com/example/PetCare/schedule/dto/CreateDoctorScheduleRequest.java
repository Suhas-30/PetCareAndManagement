package com.example.PetCare.schedule.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateDoctorScheduleRequest {

    private LocalDate date;

    private Boolean isWorking;

    private List<DoctorSessionRequest> sessions;
}