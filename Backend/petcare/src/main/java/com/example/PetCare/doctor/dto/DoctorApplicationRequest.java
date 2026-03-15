package com.example.PetCare.doctor.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class DoctorApplicationRequest {

    @NotBlank(message = "License number is required")
    private String licenseNumber;

    @NotBlank(message = "Specialization is required")
    private String specialization;

    @NotNull(message = "Experience is required")
    @Min(value = 0, message = "Experience cannot be negative")
    private Integer yearsOfExperience;

    // ✅ certificate upload
    private String certificatePath;

    // ✅ clinic details
    @NotBlank
    private String clinicName;

    @NotBlank
    private String phone;

    private String clinicEmail;

    @NotBlank
    private String address1;

    private String address2;

    @NotBlank
    private String area;

    @NotBlank
    private String city;

    @NotBlank
    private String state;

    @NotBlank
    private String pincode;

    @NotBlank
    private String consultationType;
}