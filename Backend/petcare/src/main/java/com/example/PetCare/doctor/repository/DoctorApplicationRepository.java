package com.example.PetCare.doctor.repository;

import com.example.PetCare.doctor.domain.ApplicationStatus;
import com.example.PetCare.doctor.domain.DoctorApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DoctorApplicationRepository extends JpaRepository<DoctorApplication, UUID> {
    Optional<DoctorApplication> findByUser_Id(UUID userId);

    List<DoctorApplication> findByStatus(ApplicationStatus status);

    boolean existsByUser_IdAndStatus(UUID userId, ApplicationStatus status);
}