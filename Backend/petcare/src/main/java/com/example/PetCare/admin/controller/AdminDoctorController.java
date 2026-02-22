package com.example.PetCare.admin.controller;

import com.example.PetCare.admin.dto.RejectDoctorApplicationRequest;
import com.example.PetCare.admin.service.AdminDoctorService;
import com.example.PetCare.common.response.ApiResponse;
import com.example.PetCare.doctor.domain.ApplicationStatus;
import com.example.PetCare.doctor.domain.DoctorApplication;
import com.example.PetCare.doctor.repository.DoctorApplicationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping({"/admin/doctor-applications"})
public class AdminDoctorController {
    private final DoctorApplicationRepository doctorApplicationRepository;
    private final AdminDoctorService adminDoctorService;

    public AdminDoctorController(DoctorApplicationRepository doctorApplicationRepository, AdminDoctorService adminDoctorService) {
        this.doctorApplicationRepository = doctorApplicationRepository;
        this.adminDoctorService = adminDoctorService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<DoctorApplication>>> getApplications(@RequestParam(defaultValue = "PENDING") String status) {
        List<DoctorApplication> applications = this.doctorApplicationRepository.findByStatus(ApplicationStatus.valueOf(status));
        return ResponseEntity.ok(new ApiResponse(true, "Applications fetched", applications));
    }

    @PostMapping({"/checkAdminDoc"})
    public String checkAdminDocCont() {
        return "Is working";
    }

    @PostMapping({"/{id}/approve"})
    public ResponseEntity<ApiResponse<Void>> approve(@PathVariable UUID id) {
        String message = this.adminDoctorService.approveDoctorApplication(id);
        return ResponseEntity.ok(new ApiResponse(true, message, (Object)null));
    }

    @PostMapping({"/{id}/reject"})
    public ResponseEntity<ApiResponse<Void>> reject(@PathVariable UUID id, @RequestBody RejectDoctorApplicationRequest request) {
        String message = this.adminDoctorService.rejectDoctorApplication(id, request.getReason());
        return ResponseEntity.ok(new ApiResponse(true, message, (Object)null));
    }
}
