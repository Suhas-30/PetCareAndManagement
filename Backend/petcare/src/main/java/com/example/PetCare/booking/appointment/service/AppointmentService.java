package com.example.PetCare.booking.appointment.service;

import com.example.PetCare.booking.appointment.domain.Appointment;
import com.example.PetCare.booking.appointment.domain.AppointmentMode;
import com.example.PetCare.booking.appointment.dto.MyAppointmentDto;
import com.example.PetCare.doctor.domain.DoctorSlot;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface AppointmentService {

    UUID createDraft(UUID userId,
                     UUID doctorId,
                     UUID slotId,
                     UUID petId,
                     AppointmentMode mode,
                     String purpose);

    void createAfterPayment(UUID contextId);

    List<DoctorSlot> getSlotsByDoctorAndDate(UUID doctorId, LocalDate date);

    List<MyAppointmentDto> getMyAppointments(UUID userId);
}