package com.example.PetCare.doctor.repository;

import com.example.PetCare.doctor.domain.DoctorApplication;
import com.example.PetCare.doctor.domain.DoctorSlot;
import com.example.PetCare.doctor.domain.SlotStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DoctorSlotRepository extends JpaRepository<DoctorSlot, UUID> {

    /* =========================================================
       GET ALL SLOTS FOR A DATE (Sorted)
       ========================================================= */
    List<DoctorSlot> findByDoctorAndSlotDateOrderByStartTimeAsc(
            DoctorApplication doctor,
            LocalDate slotDate
    );

    /* =========================================================
       GET ONLY AVAILABLE SLOTS
       ========================================================= */
    List<DoctorSlot> findByDoctorAndSlotDateAndStatusOrderByStartTimeAsc(
            DoctorApplication doctor,
            LocalDate slotDate,
            SlotStatus status
    );

    /* =========================================================
       SECURITY CHECK (Doctor owns slot)
       ========================================================= */
    Optional<DoctorSlot> findByIdAndDoctor(
            UUID id,
            DoctorApplication doctor
    );

    /* =========================================================
       FIND EXACT SLOT (Used to prevent duplicate time)
       ========================================================= */
    Optional<DoctorSlot> findByDoctorAndSlotDateAndStartTime(
            DoctorApplication doctor,
            LocalDate slotDate,
            LocalTime startTime
    );

    /* =========================================================
       OVERLAP CHECK (Exclude CANCELLED)
       ========================================================= */
    @Query("""
           SELECT s FROM DoctorSlot s
           WHERE s.doctor = :doctor
           AND s.slotDate = :slotDate
           AND s.status <> com.example.PetCare.doctor.domain.SlotStatus.CANCELLED
           AND (
                :startTime < s.endTime
                AND :endTime > s.startTime
           )
           """)
    List<DoctorSlot> findOverlappingSlots(
            DoctorApplication doctor,
            LocalDate slotDate,
            LocalTime startTime,
            LocalTime endTime
    );

    List<DoctorSlot> findByDoctor_IdAndSlotDateAndStatusOrderByStartTimeAsc(
            UUID doctorId,
            LocalDate slotDate,
            SlotStatus status
    );
}