package com.example.PetCare.schedule.repository;

import com.example.PetCare.schedule.domain.DoctorDaySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DoctorDayScheduleRepository
        extends JpaRepository<DoctorDaySchedule, UUID> {

    Optional<DoctorDaySchedule> findByDoctorIdAndDate(UUID doctorId, LocalDate date);

    List<DoctorDaySchedule> findByDoctorIdAndDateBetween(
            UUID doctorId,
            LocalDate startDate,
            LocalDate endDate
    );
}