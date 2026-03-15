package com.example.PetCare.doctor.controller;

import com.example.PetCare.common.exception.AppException;
import com.example.PetCare.common.response.ApiResponse;
import com.example.PetCare.common.security.UserPrincipal;
import com.example.PetCare.doctor.domain.ApplicationStatus;
import com.example.PetCare.doctor.domain.DoctorApplication;
import com.example.PetCare.doctor.domain.DoctorSlot;
import com.example.PetCare.doctor.dto.CreateSlotRequest;
import com.example.PetCare.doctor.dto.DoctorSlotResponse;
import com.example.PetCare.doctor.repository.DoctorApplicationRepository;
import com.example.PetCare.doctor.service.DoctorSlotService;
import com.example.PetCare.user.domain.User;
import com.example.PetCare.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/doctor/slots")
@RequiredArgsConstructor
public class DoctorSlotController {

    private final DoctorSlotService slotService;
    private final UserRepository userRepository;
    private final DoctorApplicationRepository doctorApplicationRepository;

    /* =========================================================
       CREATE SLOT
       ========================================================= */

    @PostMapping
    public ApiResponse<DoctorSlotResponse> createSlot(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody CreateSlotRequest request
    ) {

        DoctorApplication doctor = getApprovedDoctor(principal);

        DoctorSlot slot = slotService.createSlot(
                doctor,
                request.getSlotDate(),
                request.getStartTime(),
                request.getDurationMinutes(),
                request.getConsultingFee()
        );

        return new ApiResponse<>(
                true,
                "Slot created successfully",
                DoctorSlotResponse.fromEntity(slot)
        );
    }

    /* =========================================================
       GET SLOTS
       ========================================================= */

    @GetMapping("/{date}")
    public ApiResponse<List<DoctorSlotResponse>> getSlots(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable LocalDate date
    ) {

        DoctorApplication doctor = getApprovedDoctor(principal);

        List<DoctorSlotResponse> response = slotService
                .getDoctorSlotsForDate(doctor, date)
                .stream()
                .map(DoctorSlotResponse::fromEntity)
                .collect(Collectors.toList());

        return new ApiResponse<>(
                true,
                "Slots fetched successfully",
                response
        );
    }

    /* =========================================================
       CANCEL SLOT
       ========================================================= */

    @DeleteMapping("/{slotId}")
    public ApiResponse<String> cancelSlot(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID slotId
    ) {

        DoctorApplication doctor = getApprovedDoctor(principal);

        slotService.cancelSlotByDoctor(doctor, slotId);

        return new ApiResponse<>(
                true,
                "Slot cancelled successfully",
                null
        );
    }

    /* =========================================================
       PRIVATE METHOD
       ========================================================= */

    private DoctorApplication getApprovedDoctor(UserPrincipal principal) {

        User user = userRepository.findByEmail(principal.getEmail())
                .orElseThrow(() -> new AppException("User not found"));

        return doctorApplicationRepository
                .findByUserAndStatus(user, ApplicationStatus.APPROVED)
                .orElseThrow(() -> new AppException("Doctor profile not approved"));
    }

    @PatchMapping("/{slotId}/activate")
    public ApiResponse<String> activateSlot(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID slotId
    ) {
        DoctorApplication doctor = getApprovedDoctor(principal);
        slotService.activateSlot(doctor, slotId);

        return new ApiResponse<>(true, "Slot activated successfully", null);
    }

}