package com.example.PetCare.schedule.controller;

import com.example.PetCare.common.response.ApiResponse;
import com.example.PetCare.common.security.UserPrincipal;
import com.example.PetCare.schedule.dto.CreateDoctorScheduleRequest;
import com.example.PetCare.schedule.dto.DoctorDayScheduleResponse;
import com.example.PetCare.schedule.dto.DoctorScheduleDateResponse;
import com.example.PetCare.schedule.service.DoctorScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/doctor/schedule")
@RequiredArgsConstructor
public class DoctorScheduleController {

    private final DoctorScheduleService doctorScheduleService;

    @PostMapping
    public ApiResponse<Void> createSchedule(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody CreateDoctorScheduleRequest request
    ) {

        UUID doctorId = userPrincipal.getId();

        doctorScheduleService.createDoctorSchedule(doctorId, request);

        return new ApiResponse<>(true, "Schedule created successfully", null);
    }

    @GetMapping
    public ApiResponse<List<DoctorScheduleDateResponse>> getConfiguredDates(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate
    ) {

        UUID doctorId = userPrincipal.getId();

        List<DoctorScheduleDateResponse> response =
                doctorScheduleService.getConfiguredDates(
                        doctorId,
                        startDate,
                        endDate
                );

        return new ApiResponse<>(true, "Schedules fetched", response);
    }

    @GetMapping("/{date}")
    public ApiResponse<DoctorDayScheduleResponse> getScheduleByDate(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable LocalDate date
    ) {

        UUID doctorId = userPrincipal.getId();

        DoctorDayScheduleResponse response =
                doctorScheduleService.getScheduleByDate(doctorId, date);

        return new ApiResponse<>(true, "Schedule fetched", response);
    }

}