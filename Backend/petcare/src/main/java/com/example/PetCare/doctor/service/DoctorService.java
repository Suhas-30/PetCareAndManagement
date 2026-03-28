package com.example.PetCare.doctor.service;

import com.example.PetCare.doctor.dto.DoctorApplicationRequest;
import com.example.PetCare.doctor.dto.DoctorApplicationStatusResponse;
import com.example.PetCare.doctor.dto.PublicDoctorCardResponse;

import java.util.List;

public interface DoctorService {
    String applyForDoctor(DoctorApplicationRequest request, String email);

    DoctorApplicationStatusResponse getMyApplicationStatus(String email);

    String withdrawApplication(String email);

    public List<PublicDoctorCardResponse> getMarketplaceDoctors();
}