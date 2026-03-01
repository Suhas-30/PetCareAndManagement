package com.example.PetCare.schedule.repository;

import com.example.PetCare.schedule.domain.DoctorDaySession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface DoctorDaySessionRepository
        extends JpaRepository<DoctorDaySession, UUID> {

    List<DoctorDaySession> findByDoctorIdAndDateOrderByStartTime(
            UUID doctorId,
            LocalDate date
    );
}