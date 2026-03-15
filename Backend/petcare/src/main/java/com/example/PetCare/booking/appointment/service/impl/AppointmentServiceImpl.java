package com.example.PetCare.booking.appointment.service.impl;

import com.example.PetCare.booking.appointment.domain.*;
import com.example.PetCare.booking.appointment.dto.MyAppointmentDto;
import com.example.PetCare.booking.appointment.repository.AppointmentDraftRepository;
import com.example.PetCare.booking.appointment.repository.AppointmentRepository;
import com.example.PetCare.booking.appointment.service.AppointmentService;
import com.example.PetCare.doctor.domain.DoctorApplication;
import com.example.PetCare.doctor.domain.DoctorSlot;
import com.example.PetCare.doctor.domain.SlotStatus;
import com.example.PetCare.doctor.repository.DoctorApplicationRepository;
import com.example.PetCare.doctor.repository.DoctorSlotRepository;
import com.example.PetCare.payment.service.google.config.GoogleMeetService;
import com.example.PetCare.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentDraftRepository draftRepository;
    private final DoctorSlotRepository slotRepository;
    private final AppointmentRepository appointmentRepository;
    private final GoogleMeetService googleMeetService;
    private final UserRepository userRepository;
    private final DoctorApplicationRepository doctorApplicationRepository;

    @Override
    public UUID createDraft(UUID userId,
                            UUID doctorId,
                            UUID slotId,
                            UUID petId,
                            AppointmentMode mode,
                            String purpose) {

        /* 1️⃣ VALIDATE SLOT */
        DoctorSlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        if (slot.getStatus() != SlotStatus.AVAILABLE) {
            throw new RuntimeException("Slot not available");
        }

        /* 2️⃣ CREATE DRAFT */
        UUID contextId = UUID.randomUUID();

        AppointmentDraft draft = AppointmentDraft.builder()
                .id(contextId)
                .userId(userId)
                .doctorId(doctorId)
                .slotId(slotId)
                .petId(petId)
                .mode(mode)
                .purpose(purpose)
                .consultingFee(slot.getConsultingFee().intValue())
                .build();

        draftRepository.save(draft);

        return contextId;
    }

    @Override
    public void createAfterPayment(UUID contextId) {

        /* 1️⃣ FETCH DRAFT */
        AppointmentDraft draft = draftRepository.findById(contextId)
                .orElseThrow(() -> new RuntimeException("Draft not found"));

        /* 2️⃣ FETCH SLOT */
        DoctorSlot slot = slotRepository.findById(draft.getSlotId())
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        if (slot.getStatus() != SlotStatus.AVAILABLE) {
            throw new RuntimeException("Slot already booked");
        }

        /* 3️⃣ FETCH EMAILS (ONLY FOR LOGGING) */
        String doctorEmail = slot.getDoctor().getClinicEmail();

        String userEmail = userRepository.findById(draft.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getEmail();

        /* 4️⃣ GENERATE MEET LINK (ONLY ONLINE) */
        String meetLink = null;

//        if (draft.getMode() == AppointmentMode.ONLINE) {
//            meetLink = googleMeetService.createMeet(
//                    doctorEmail,
//                    userEmail,
//                    slot.getSlotDate().atTime(slot.getStartTime())
//            );
//        }

        /* 5️⃣ CREATE APPOINTMENT */
        Appointment appointment = Appointment.builder()
                .userId(draft.getUserId())
                .doctorId(draft.getDoctorId())
                .slotId(draft.getSlotId())
                .petId(draft.getPetId())
                .mode(draft.getMode())
                .status(AppointmentStatus.CONFIRMED)
                .purpose(draft.getPurpose())
                .consultingFee(draft.getConsultingFee())
                .clinicAddressSnapshot(slot.getDoctor().getAddress1())
                .meetingLink(meetLink)
                .build();

        appointmentRepository.save(appointment);

        /* 6️⃣ MARK SLOT BOOKED */
        slot.markBooked();
        slotRepository.save(slot);

        /* 7️⃣ DELETE DRAFT */
        draftRepository.deleteById(contextId);

        /* 8️⃣ PRINT CONFIRMATION IN CONSOLE */

        System.out.println("\n================ APPOINTMENT CONFIRMED ================");

        if (draft.getMode() == AppointmentMode.ONLINE) {

            System.out.println("USER EMAIL: " + userEmail);
            System.out.println("DOCTOR EMAIL: " + doctorEmail);
            System.out.println("Doctor: " + slot.getDoctor().getClinicName());
            System.out.println("Date: " + slot.getSlotDate());
            System.out.println("Time: " + slot.getStartTime());
            System.out.println("Google Meet Link: " + meetLink);

        } else {

            System.out.println("USER EMAIL: " + userEmail);
            System.out.println("DOCTOR EMAIL: " + doctorEmail);
            System.out.println("Doctor: " + slot.getDoctor().getClinicName());
            System.out.println("Date: " + slot.getSlotDate());
            System.out.println("Time: " + slot.getStartTime());
            System.out.println("Clinic Address: " + slot.getDoctor().getAddress1());
        }

        System.out.println("=======================================================\n");
    }

    @Override
    public List<DoctorSlot> getSlotsByDoctorAndDate(UUID doctorId, LocalDate date) {

        List<DoctorSlot> slots =
                slotRepository.findByDoctor_IdAndSlotDateAndStatusOrderByStartTimeAsc(
                        doctorId,
                        date,
                        SlotStatus.AVAILABLE
                );

        System.out.println("SLOTS SIZE = " + slots.size());

        return slots;
    }

    @Override
    public List<MyAppointmentDto> getMyAppointments(UUID userId) {

        List<Appointment> appointments = appointmentRepository.findByUserId(userId);

        return appointments.stream().map(appt -> {

            // ✅ GET DOCTOR
            DoctorApplication doctor =
                    doctorApplicationRepository.findById(appt.getDoctorId()).orElse(null);

            String doctorName = doctor != null
                    ? doctor.getUser().getFullName()
                    : "-";

            // ✅ GET SLOT
            DoctorSlot slot =
                    slotRepository.findById(appt.getSlotId()).orElse(null);

            return MyAppointmentDto.builder()
                    .id(appt.getId())
                    .doctorName(doctorName)
                    .slotDate(slot != null ? slot.getSlotDate() : null)
                    .startTime(slot != null ? slot.getStartTime() : null)
                    .endTime(slot != null ? slot.getEndTime() : null)
                    .mode(appt.getMode().name())
                    .clinicAddressSnapshot(appt.getClinicAddressSnapshot())
                    .meetingLink(appt.getMeetingLink())
                    .status(appt.getStatus().name())
                    .prescription(null) // later
                    .build();

        }).toList();
    }
}