package com.example.PetCare.doctor.controller;

import com.example.PetCare.common.response.ApiResponse;
import com.example.PetCare.common.security.UserPrincipal;
import com.example.PetCare.doctor.dto.DoctorApplicationRequest;
import com.example.PetCare.doctor.dto.DoctorApplicationStatusResponse;
import com.example.PetCare.doctor.dto.PublicDoctorCardResponse;
import com.example.PetCare.doctor.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor")
public class DoctorController {
    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping({"/apply"})
    public ResponseEntity<ApiResponse<Void>> apply(@AuthenticationPrincipal UserPrincipal user,
                                                   @ModelAttribute @Valid DoctorApplicationRequest request) {
        String message = this.doctorService.applyForDoctor(request, user.getEmail());
        return ResponseEntity.ok(new ApiResponse(true, message, (Object)null));
    }

    @GetMapping({"/application/status"})
    public ResponseEntity<ApiResponse<?>> getMyStatus(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        System.out.println("Request for doctor application status is hitted...");
        DoctorApplicationStatusResponse application = this.doctorService.getMyApplicationStatus(userPrincipal.getEmail());

        if (application == null) {
            return ResponseEntity.ok(
                    new ApiResponse<>(true, "No application found", null)
            );
        }


        return ResponseEntity.ok(new ApiResponse(true, "Application Fetched", application));
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

}