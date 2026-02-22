package com.example.PetCare.admin.service.impl;

import com.example.PetCare.admin.service.AdminDoctorService;
import com.example.PetCare.common.exception.AppException;
import com.example.PetCare.doctor.domain.ApplicationStatus;
import com.example.PetCare.doctor.domain.DoctorApplication;
import com.example.PetCare.doctor.repository.DoctorApplicationRepository;
import com.example.PetCare.user.domain.Role;
import com.example.PetCare.user.domain.User;
import com.example.PetCare.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AdminDoctorServiceImpl implements AdminDoctorService {
    private final DoctorApplicationRepository doctorApplicationRepository;
    private final UserRepository userRepository;

    AdminDoctorServiceImpl(DoctorApplicationRepository doctorApplicationRepository, UserRepository userRepository) {
        this.doctorApplicationRepository = doctorApplicationRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public String approveDoctorApplication(UUID applicationId) {
        DoctorApplication application = (DoctorApplication)this.doctorApplicationRepository.findById(applicationId).orElseThrow(() -> new RuntimeException("Application not found"));
        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new RuntimeException("Application already reviewed");
        } else {
            application.setStatus(ApplicationStatus.APPROVED);
            application.setReviewedAt(LocalDateTime.now());
            User user = application.getUser();
            user.setRole(Role.DOCTOR);
            this.userRepository.save(user);
            this.doctorApplicationRepository.save(application);
            return "Doctor application approved successfully";
        }
    }

    @Transactional
    public String rejectDoctorApplication(UUID applicationId, String reason) {
        DoctorApplication application = (DoctorApplication)this.doctorApplicationRepository.findById(applicationId).orElseThrow(() -> new AppException("Application not found"));
        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new AppException("Application already reviewed");
        } else {
            application.setStatus(ApplicationStatus.REJECTED);
            application.setRejectionReason(reason);
            application.setReviewedAt(LocalDateTime.now());
            this.doctorApplicationRepository.save(application);
            return "Doctor application rejected successfully";
        }
    }
}