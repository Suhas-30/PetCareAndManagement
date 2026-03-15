package com.example.PetCare.booking.appointment.controller;

import com.example.PetCare.booking.appointment.domain.AppointmentMode;
import com.example.PetCare.booking.appointment.dto.SlotResponseDTO;
import com.example.PetCare.booking.appointment.service.AppointmentService;
import com.example.PetCare.common.security.UserPrincipal;
import com.example.PetCare.payment.domain.PaymentContextType;
import com.example.PetCare.payment.service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/user/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final RazorpayService razorpayService;

    /* ================= CREATE DRAFT + PAYMENT ================= */

    @PostMapping("/create")
    public Map<String, Object> createAppointment(@AuthenticationPrincipal UserPrincipal user,
                                                 @RequestBody Map<String, String> req) throws Exception {

        UUID doctorId = UUID.fromString(req.get("doctorId"));
        UUID slotId = UUID.fromString(req.get("slotId"));
        UUID petId = UUID.fromString(req.get("petId"));
        AppointmentMode mode = AppointmentMode.valueOf(req.get("mode"));
        String purpose = req.get("purpose");

        /* 👉 STEP 1: CREATE DRAFT */
        UUID contextId = appointmentService.createDraft(
                user.getId(),
                doctorId,
                slotId,
                petId,
                mode,
                purpose
        );

        /* 👉 STEP 2: CREATE PAYMENT */
        int amount = Integer.parseInt(req.get("amount"));

        String orderJson = razorpayService.createOrder(
                contextId,
                PaymentContextType.APPOINTMENT,
                amount
        );

        return Map.of("data", new org.json.JSONObject(orderJson).toMap());
    }

    @GetMapping("/{doctorId}/slots/{date}")
    public ResponseEntity<List<SlotResponseDTO>> getSlots(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable UUID doctorId,
            @PathVariable String date) {
        System.out.println("Api hit for slot and doctor slot info ");
        List<SlotResponseDTO> data = appointmentService
                .getSlotsByDoctorAndDate(doctorId, LocalDate.parse(date))
                .stream()
                .map(slot -> SlotResponseDTO.builder()
                        .id(slot.getId())
                        .startTime(slot.getStartTime())
                        .endTime(slot.getEndTime())
                        .consultingFee(slot.getConsultingFee())
                        .doctor(SlotResponseDTO.DoctorInfo.builder()
                                .address1(slot.getDoctor().getAddress1())
                                .address2(slot.getDoctor().getAddress2())
                                .area(slot.getDoctor().getArea())
                                .city(slot.getDoctor().getCity())
                                .consultationType(slot.getDoctor().getConsultationType())
                                .build())
                        .build())
                .toList();

        return ResponseEntity.ok(data);
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyAppointments(@AuthenticationPrincipal UserPrincipal user) {
        UUID userId = user.getId();
        var appointments = appointmentService.getMyAppointments(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", appointments);

        return ResponseEntity.ok(response);
    }


}