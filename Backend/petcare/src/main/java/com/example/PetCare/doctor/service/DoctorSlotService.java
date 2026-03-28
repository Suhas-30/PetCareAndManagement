package com.example.PetCare.doctor.service;

import com.example.PetCare.doctor.domain.DoctorApplication;
import com.example.PetCare.doctor.domain.DoctorSlot;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface DoctorSlotService {

    DoctorSlot createSlot(
            DoctorApplication doctor,
            LocalDate slotDate,
            LocalTime startTime,
            int durationMinutes,
            BigDecimal consultingFee
    );

    void cancelSlotByDoctor(
            DoctorApplication doctor,
            UUID slotId
    );

    void activateSlot(
            DoctorApplication doctor,
            UUID slotId
    );

    List<DoctorSlot> getDoctorSlotsForDate(
            DoctorApplication doctor,
            LocalDate slotDate
    );

    void markSlotAsBooked(
            UUID slotId
    );
}