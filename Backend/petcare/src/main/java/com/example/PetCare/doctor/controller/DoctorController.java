package com.example.PetCare.doctor.controller;

import com.example.PetCare.common.response.ApiResponse;
import com.example.PetCare.common.security.UserPrincipal;
import com.example.PetCare.doctor.dto.*;
import com.example.PetCare.doctor.service.DoctorDashboardService;
import com.example.PetCare.doctor.service.DoctorService;
import com.example.PetCare.doctor.service.FileStorageService;
import com.example.PetCare.doctor.service.impl.DoctorFileStorageServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/doctor")
@RequiredArgsConstructor
public class DoctorController {
    private final DoctorService doctorService;
    private final FileStorageService fileStorageService;
    private final DoctorDashboardService doctorDashboardService;



    @PostMapping("/upload-certificate")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadCertificate(
            @RequestParam("file") MultipartFile file
    ) {

        String fileName = fileStorageService.saveCertificate(file);

        Map<String, String> data = new HashMap<>();
        data.put("fileName", fileName);
        data.put("url", "/uploads/certificates/" + fileName);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "File uploaded successfully", data)
        );
    }

    @PostMapping("/apply")
    public ResponseEntity<ApiResponse<Void>> apply(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestBody @Valid DoctorApplicationRequest request
    ) {
        String message = doctorService.applyForDoctor(request, user.getEmail());
        return ResponseEntity.ok(new ApiResponse<>(true, message, null));
    }

    @GetMapping("/application/status")
    public ResponseEntity<ApiResponse<DoctorApplicationStatusResponse>> getMyStatus(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        System.out.println("Request for doctor application status is hitted...");

        DoctorApplicationStatusResponse application =
                doctorService.getMyApplicationStatus(userPrincipal.getEmail());

        if (application == null) {
            return ResponseEntity.ok(
                    new ApiResponse<>(true, "No application found", null)
            );
        }

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Application Fetched", application)
        );
    }

    @PutMapping("/application/withdraw")
    public ResponseEntity<ApiResponse<Void>> withdraw(@AuthenticationPrincipal UserPrincipal user){
        String message = doctorService.withdrawApplication(user.getEmail());
        return ResponseEntity.ok(new ApiResponse<>(true, message, null));
    }

    @GetMapping
    public ApiResponse<List<PublicDoctorCardResponse>> getDoctors() {
        return new  ApiResponse<>(true, "Doctor Details Featached successfully", doctorService.getMarketplaceDoctors());
    }

    @GetMapping("/upcoming-appointments")
    public ResponseEntity<ApiResponse<?>> getUpcomingAppointments(
            @AuthenticationPrincipal UserPrincipal user
    ) {

        var data = doctorDashboardService.getUpcomingAppointments(user.getId());

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Upcoming appointments fetched", data)
        );
    }

    @PostMapping("/prescription")
    public ResponseEntity<ApiResponse<?>> savePrescription(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestBody SavePrescriptionRequest request
    ) {

        var data = doctorDashboardService.saveOrUpdatePrescription(user.getId(), request);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Prescription saved", data)
        );
    }

    @GetMapping("/prescription/{appointmentId}")
    public ResponseEntity<ApiResponse<?>> getPrescription(
            @PathVariable UUID appointmentId
    ) {

        var data = doctorDashboardService.getPrescription(appointmentId);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Prescription fetched", data)
        );
    }

    @PutMapping("/meeting-link")
    public ResponseEntity<ApiResponse<?>> updateMeetingLink(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestBody UpdateMeetingLinkRequest request
    ) {

        var data = doctorDashboardService.updateMeetingLink(
                user.getId(),
                request.getAppointmentId(),
                request.getMeetingLink()
        );

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Meeting link updated", data)
        );
    }

    @GetMapping("/meeting-link/{appointmentId}")
    public ResponseEntity<ApiResponse<?>> getMeetingLink(
            @PathVariable UUID appointmentId
    ) {

        var data = doctorDashboardService.getMeetingLink(appointmentId);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Meeting link fetched", data)
        );
    }

}