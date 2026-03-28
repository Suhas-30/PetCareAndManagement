package com.example.PetCare.doctor.repository;

import com.example.PetCare.doctor.domain.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PrescriptionRepository extends JpaRepository<Prescription, UUID> {

    Optional<Prescription> findByAppointmentId(UUID appointmentId);

}