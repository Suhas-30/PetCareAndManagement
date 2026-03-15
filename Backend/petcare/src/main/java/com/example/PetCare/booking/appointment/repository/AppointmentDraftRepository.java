package com.example.PetCare.booking.appointment.repository;

import com.example.PetCare.booking.appointment.domain.AppointmentDraft;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AppointmentDraftRepository extends JpaRepository<AppointmentDraft, UUID> {
}