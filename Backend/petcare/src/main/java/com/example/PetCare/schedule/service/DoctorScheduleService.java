package com.example.PetCare.schedule.service;

import com.example.PetCare.schedule.dto.CreateDoctorScheduleRequest;
import com.example.PetCare.schedule.dto.DoctorDayScheduleResponse;
import com.example.PetCare.schedule.dto.DoctorScheduleDateResponse;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface DoctorScheduleService {
    void createDoctorSchedule(UUID doctorId,
                              CreateDoctorScheduleRequest request);
    List<DoctorScheduleDateResponse> getConfiguredDates(
            UUID doctorId,
            LocalDate startDate,
            LocalDate endDate
    );

    DoctorDayScheduleResponse getScheduleByDate(
            UUID doctorId,
            LocalDate date
    );
}