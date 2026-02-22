package com.example.PetCare.doctor.service;

import com.example.PetCare.doctor.dto.DoctorApplicationRequest;
import com.example.PetCare.doctor.dto.DoctorApplicationStatusResponse;

public interface DoctorService {
    String applyForDoctor(DoctorApplicationRequest request, String email);

    DoctorApplicationStatusResponse getMyApplicationStatus(String email);
}