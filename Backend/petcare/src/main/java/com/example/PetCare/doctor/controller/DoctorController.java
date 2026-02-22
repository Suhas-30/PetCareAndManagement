package com.example.PetCare.doctor.controller;

import com.example.PetCare.common.response.ApiResponse;
import com.example.PetCare.doctor.dto.DoctorApplicationRequest;
import com.example.PetCare.doctor.dto.DoctorApplicationStatusResponse;
import com.example.PetCare.doctor.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/doctor"})
public class DoctorController {
    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping({"/apply"})
    public ResponseEntity<ApiResponse<Void>> apply(@AuthenticationPrincipal String email, @RequestBody @Valid DoctorApplicationRequest request) {
        String message = this.doctorService.applyForDoctor(request, email);
        return ResponseEntity.ok(new ApiResponse(true, message, (Object)null));
    }

    @GetMapping({"/application/status"})
    public ResponseEntity<ApiResponse<DoctorApplicationStatusResponse>> getMyStatus(@RequestParam String email) {
        DoctorApplicationStatusResponse application = this.doctorService.getMyApplicationStatus(email);
        return ResponseEntity.ok(new ApiResponse(true, "Application Fetched", application));
    }
}