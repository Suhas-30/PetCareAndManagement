package com.example.PetCare.schedule.repository;

import com.example.PetCare.schedule.domain.DoctorAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface DoctorAvailabilityRepository
        extends JpaRepository<DoctorAvailability, UUID> {

    List<DoctorAvailability> findByDoctorIdAndDate(
            UUID doctorId,
            LocalDate date
    );

    void deleteByDoctorIdAndDate(UUID doctorId, LocalDate date);
}