package com.example.PetCare.doctor.service.impl;

import com.example.PetCare.booking.appointment.domain.*;
import com.example.PetCare.booking.appointment.repository.AppointmentRepository;
import com.example.PetCare.doctor.domain.DoctorApplication;
import com.example.PetCare.doctor.domain.DoctorSlot;
import com.example.PetCare.doctor.domain.Prescription;
import com.example.PetCare.doctor.dto.*;
import com.example.PetCare.doctor.repository.DoctorApplicationRepository;
import com.example.PetCare.doctor.repository.DoctorSlotRepository;
import com.example.PetCare.doctor.repository.PrescriptionRepository;
import com.example.PetCare.doctor.service.DoctorDashboardService;
import com.example.PetCare.notification.service.NotificationService;
import com.example.PetCare.pets.domain.Pet;
import com.example.PetCare.pets.repository.PetRepository;
import com.example.PetCare.user.domain.User;
import com.example.PetCare.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DoctorDashboardServiceImpl implements DoctorDashboardService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorApplicationRepository doctorApplicationRepository;
    private final DoctorSlotRepository doctorSlotRepository;
    private final UserRepository userRepository;
    private final PetRepository petRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final NotificationService notificationService; // ✅ Added

    /* =========================================================
       UPCOMING APPOINTMENTS
       ========================================================= */

    @Override
    public List<UpcomingAppointmentDto> getUpcomingAppointments(UUID doctorUserId) {

        DoctorApplication doctor = doctorApplicationRepository
                .findTopByUser_IdOrderByCreatedAtDesc(doctorUserId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        List<Appointment> appointments =
                appointmentRepository.findByDoctorIdAndStatus(
                        doctor.getId(),
                        AppointmentStatus.CONFIRMED
                );

        return appointments.stream().map(appt -> {

            DoctorSlot slot =
                    doctorSlotRepository.findById(appt.getSlotId()).orElse(null);

            if (slot == null || slot.getSlotDate().isBefore(LocalDate.now()))
                return null;

            User owner =
                    userRepository.findById(appt.getUserId()).orElse(null);

            Pet pet =
                    petRepository.findById(appt.getPetId()).orElse(null);

            List<String> history = List.of();

            if (pet != null) {
                history = pet.getMedicalHistories()
                        .stream()
                        .map(h -> h.getTitle())
                        .toList();
            }

            return UpcomingAppointmentDto.builder()
                    .appointmentId(appt.getId())
                    .ownerName(owner != null ? owner.getFullName() : "-")
                    .petName(pet != null ? pet.getName() : "-")
                    .species(pet != null ? pet.getSpecies() : "-")
                    .breed(pet != null ? pet.getBreed() : "-")
                    .weight(pet != null ? pet.getWeight() : null)
                    .slotDate(slot.getSlotDate())
                    .startTime(slot.getStartTime())
                    .endTime(slot.getEndTime())
                    .purpose(appt.getPurpose())
                    .mode(appt.getMode().name())
                    .medicalHistory(history)
                    .build();

        }).filter(java.util.Objects::nonNull).toList();
    }

    /* =========================================================
       SAVE / UPDATE PRESCRIPTION
       ========================================================= */

    @Override
    public PrescriptionResponse saveOrUpdatePrescription(UUID doctorUserId, SavePrescriptionRequest request) {

        UUID appointmentId = request.getAppointmentId();
        String notes = request.getNotes();

        DoctorApplication doctor = doctorApplicationRepository
                .findTopByUser_IdOrderByCreatedAtDesc(doctorUserId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!appointment.getDoctorId().equals(doctor.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        Prescription prescription = prescriptionRepository
                .findByAppointmentId(appointmentId)
                .orElse(
                        Prescription.builder()
                                .appointmentId(appointmentId)
                                .build()
                );

        prescription.setNotes(notes);

        Prescription saved = prescriptionRepository.save(prescription);

        return mapToDto(saved);
    }

    /* =========================================================
       GET PRESCRIPTION
       ========================================================= */

    @Override
    public PrescriptionResponse getPrescription(UUID appointmentId) {

        Prescription prescription = prescriptionRepository
                .findByAppointmentId(appointmentId)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));

        return mapToDto(prescription);
    }

    /* =========================================================
       UPDATE MEETING LINK + SEND EMAIL
       ========================================================= */

    @Override
    public PrescriptionResponse updateMeetingLink(UUID doctorUserId, UUID appointmentId, String meetingLink) {

        DoctorApplication doctor = doctorApplicationRepository
                .findTopByUser_IdOrderByCreatedAtDesc(doctorUserId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!appointment.getDoctorId().equals(doctor.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        /* UPDATE PRESCRIPTION */

        Prescription prescription = prescriptionRepository
                .findByAppointmentId(appointmentId)
                .orElse(
                        Prescription.builder()
                                .appointmentId(appointmentId)
                                .build()
                );

        prescription.setMeetingLink(meetingLink);
        Prescription saved = prescriptionRepository.save(prescription);

        /* UPDATE APPOINTMENT */

        appointment.setMeetingLink(meetingLink);
        appointmentRepository.save(appointment);

        /* SEND EMAIL TO PET OWNER */

        User owner = userRepository.findById(appointment.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        DoctorSlot slot = doctorSlotRepository.findById(appointment.getSlotId()).orElse(null);

        String subject = "Your Consultation Meeting Link - Smart Pet Care";

        String message =
                "Your consultation meeting link has been shared by Dr. "
                        + doctor.getUser().getFullName() + ".\n\n" +

                        "Date: " + (slot != null ? slot.getSlotDate() : "-") + "\n" +
                        "Time: " + (slot != null ? slot.getStartTime() : "-") + "\n\n" +

                        "Join Meeting:\n" + meetingLink + "\n\n" +

                        "Please join on time.\n\n" +
                        "Smart Pet Care Team";

        notificationService.send(owner.getEmail(), subject, message);

        return mapToDto(saved);
    }

    /* =========================================================
       GET MEETING LINK
       ========================================================= */

    @Override
    public String getMeetingLink(UUID appointmentId) {

        Prescription prescription = prescriptionRepository
                .findByAppointmentId(appointmentId)
                .orElseThrow(() -> new RuntimeException("Meeting link not found"));

        return prescription.getMeetingLink();
    }

    /* =========================================================
       MAPPER
       ========================================================= */

    private PrescriptionResponse mapToDto(Prescription p) {

        return PrescriptionResponse.builder()
                .id(p.getId())
                .appointmentId(p.getAppointmentId())
                .notes(p.getNotes())
                .createdAt(p.getCreatedAt())
                .updatedAt(p.getUpdatedAt())
                .build();
    }
}