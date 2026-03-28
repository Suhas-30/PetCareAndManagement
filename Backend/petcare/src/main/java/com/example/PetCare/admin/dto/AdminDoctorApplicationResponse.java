package com.example.PetCare.admin.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class AdminDoctorApplicationResponse {

    private UUID id;

    private String fullName;
    private String email;

    private String specialization;
    private Integer yearsOfExperience;
    private String licenseNumber;

    private String clinicName;
    private String phone;
    private String clinicEmail;

    private String address1;
    private String address2;
    private String area;
    private String city;
    private String state;
    private String pincode;

    private String consultationType;

    private String certificateUrl;
}