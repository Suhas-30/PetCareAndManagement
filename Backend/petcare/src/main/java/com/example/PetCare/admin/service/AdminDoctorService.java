package com.example.PetCare.admin.service;

import com.example.PetCare.admin.dto.AdminDoctorApplicationResponse;
import com.example.PetCare.doctor.domain.DoctorApplication;

import java.util.List;
import java.util.UUID;


public interface AdminDoctorService {


    public List<AdminDoctorApplicationResponse> getPendingApplications();

    public void approveApplication(UUID applicationId);

    public void rejectApplication(UUID applicationId, String reason);
}
