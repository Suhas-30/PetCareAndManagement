package com.example.PetCare.doctor.service.impl;

import com.example.PetCare.common.exception.AppException;
import com.example.PetCare.doctor.domain.DoctorApplication;
import com.example.PetCare.doctor.domain.DoctorSlot;
import com.example.PetCare.doctor.domain.SlotStatus;
import com.example.PetCare.doctor.repository.DoctorSlotRepository;
import com.example.PetCare.doctor.service.DoctorSlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DoctorSlotServiceImpl implements DoctorSlotService {

    private final DoctorSlotRepository slotRepository;

    /* =========================================================
       CREATE SLOT
       ========================================================= */

    @Override
    @Transactional
    public DoctorSlot createSlot(
            DoctorApplication doctor,
            LocalDate slotDate,
            LocalTime startTime,
            int durationMinutes,
            BigDecimal consultingFee
    ) {

        validateFutureDateTime(slotDate, startTime);

        LocalTime endTime = startTime.plusMinutes(durationMinutes);

        // 1️⃣ Check if exact slot already exists
        Optional<DoctorSlot> existingOpt =
                slotRepository.findByDoctorAndSlotDateAndStartTime(
                        doctor, slotDate, startTime
                );

        if (existingOpt.isPresent()) {
            DoctorSlot existing = existingOpt.get();

            if (existing.getStatus() == SlotStatus.CANCELLED) {
                throw new AppException(
                        "Slot already exists but is cancelled. Please activate it."
                );
            }

            throw new AppException(
                    "You cannot add the same time slot again."
            );
        }

        // 2️⃣ Check overlap
        validateOverlap(doctor, slotDate, startTime, endTime);

        // 3️⃣ Create new slot
        DoctorSlot slot = new DoctorSlot();
        slot.setDoctor(doctor);
        slot.setSlotDate(slotDate);
        slot.setStartTime(startTime);
        slot.setEndTime(endTime);
        slot.setStatus(SlotStatus.AVAILABLE);
        slot.setCreatedAt(LocalDateTime.now());
        slot.setConsultingFee(consultingFee);

        return slotRepository.save(slot);
    }

    /* =========================================================
       CANCEL SLOT
       ========================================================= */

    @Override
    @Transactional
    public void cancelSlotByDoctor(DoctorApplication doctor, UUID slotId) {

        DoctorSlot slot = slotRepository
                .findByIdAndDoctor(slotId, doctor)
                .orElseThrow(() -> new AppException("Slot not found"));

        if (slot.getStatus() == SlotStatus.BOOKED) {
            throw new AppException("Booked slot cannot be cancelled.");
        }

        slot.setStatus(SlotStatus.CANCELLED);
    }

    /* =========================================================
       ACTIVATE SLOT
       ========================================================= */

    @Override
    @Transactional
    public void activateSlot(DoctorApplication doctor, UUID slotId) {

        DoctorSlot slot = slotRepository
                .findByIdAndDoctor(slotId, doctor)
                .orElseThrow(() -> new AppException("Slot not found"));

        if (slot.getStatus() != SlotStatus.CANCELLED) {
            throw new AppException("Only cancelled slots can be activated.");
        }

        slot.setStatus(SlotStatus.AVAILABLE);
    }

    /* =========================================================
       GET SLOTS
       ========================================================= */

    @Override
    public List<DoctorSlot> getDoctorSlotsForDate(
            DoctorApplication doctor,
            LocalDate slotDate
    ) {
        return slotRepository
                .findByDoctorAndSlotDateOrderByStartTimeAsc(doctor, slotDate);
    }

    /* =========================================================
       MARK SLOT AS BOOKED
       ========================================================= */

    @Override
    @Transactional
    public void markSlotAsBooked(UUID slotId) {

        DoctorSlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new AppException("Slot not found"));

        if (slot.getStatus() != SlotStatus.AVAILABLE) {
            throw new AppException("Slot is not available.");
        }

        slot.setStatus(SlotStatus.BOOKED);
    }

    /* =========================================================
       VALIDATIONS
       ========================================================= */

    private void validateFutureDateTime(
            LocalDate slotDate,
            LocalTime startTime
    ) {

        LocalDate today = LocalDate.now();

        if (slotDate.isBefore(today)) {
            throw new AppException("Cannot create slot in the past.");
        }

        if (slotDate.isEqual(today) &&
                startTime.isBefore(LocalTime.now())) {
            throw new AppException("Cannot create slot for past time.");
        }
    }

    private void validateOverlap(
            DoctorApplication doctor,
            LocalDate slotDate,
            LocalTime startTime,
            LocalTime endTime
    ) {

        List<DoctorSlot> overlapping =
                slotRepository.findOverlappingSlots(
                        doctor, slotDate, startTime, endTime
                );

        if (!overlapping.isEmpty()) {
            throw new AppException(
                    "Slot overlaps with existing slot."
            );
        }
    }
}