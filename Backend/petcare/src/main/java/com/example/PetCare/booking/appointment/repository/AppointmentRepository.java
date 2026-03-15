package com.example.PetCare.booking.appointment.repository;

import com.example.PetCare.booking.appointment.domain.Appointment;
import com.example.PetCare.booking.appointment.domain.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {
    List<Appointment> findByUserId(UUID userId);

    List<Appointment> findByDoctorIdAndStatus(UUID doctorId, AppointmentStatus status);
}