package com.example.PetCare.user.service;

import com.example.PetCare.doctor.domain.DoctorApplication;
import com.example.PetCare.user.dto.DoctorListResponse;

import java.util.List;

public interface UserService {
    List<DoctorListResponse> getAllDoctors();
}
