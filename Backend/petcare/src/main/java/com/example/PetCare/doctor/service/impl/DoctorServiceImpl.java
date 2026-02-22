package com.example.PetCare.doctor.service.impl;

import com.example.PetCare.common.exception.AppException;
import com.example.PetCare.doctor.domain.ApplicationStatus;
import com.example.PetCare.doctor.domain.DoctorApplication;
import com.example.PetCare.doctor.dto.DoctorApplicationRequest;
import com.example.PetCare.doctor.dto.DoctorApplicationStatusResponse;
import com.example.PetCare.doctor.repository.DoctorApplicationRepository;
import com.example.PetCare.doctor.service.DoctorService;
import com.example.PetCare.user.domain.Role;
import com.example.PetCare.user.domain.User;
import com.example.PetCare.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class DoctorServiceImpl implements DoctorService {
    private final UserRepository userRepository;
    private final DoctorApplicationRepository doctorApplicationRepository;

    public DoctorServiceImpl(UserRepository userRepository, DoctorApplicationRepository doctorApplicationRepository) {
        this.doctorApplicationRepository = doctorApplicationRepository;
        this.userRepository = userRepository;
    }

    public String applyForDoctor(DoctorApplicationRequest request, String email) {
        User user = (User)this.userRepository.findByEmail(email).orElseThrow(() -> new AppException("User Not fount"));
        if (user.getRole() == Role.DOCTOR) {
            throw new AppException("You are already a doctor");
        } else {
            boolean alreadyPending = this.doctorApplicationRepository.existsByUser_IdAndStatus(user.getId(), ApplicationStatus.PENDING);
            if (alreadyPending) {
                throw new AppException("You already have a pending application");
            } else {
                DoctorApplication application = new DoctorApplication();
                application.setUser(user);
                application.setLicenseNumber(request.getLicenseNumber());
                application.setSpecialization(request.getSpecialization());
                application.setDocumentUrl(request.getDocumentUrl());
                application.setYearsOfExperience(request.getYearsOfExperience());
                application.setStatus(ApplicationStatus.PENDING);
                this.doctorApplicationRepository.save(application);
                return "Doctor application submitted successfully";
            }
        }
    }

    public DoctorApplicationStatusResponse getMyApplicationStatus(String email) {
        User user = (User)this.userRepository.findByEmail(email).orElseThrow(() -> new AppException("User not found"));
        DoctorApplication application = (DoctorApplication)this.doctorApplicationRepository.findByUser_Id(user.getId()).orElseThrow(() -> new AppException("No doctor application found"));
        DoctorApplicationStatusResponse response = new DoctorApplicationStatusResponse();
        response.setStatus(application.getStatus().name());
        response.setRejectReason(application.getRejectionReason());
        return response;
    }
}
