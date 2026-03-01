package com.example.PetCare.admin.service.impl;

import com.example.PetCare.admin.dto.AdminDoctorApplicationResponse;
import com.example.PetCare.admin.mapper.AdminDoctorApplicationMapper;
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
import java.util.List;
import java.util.UUID;

@Service
public class AdminDoctorServiceImpl implements AdminDoctorService {

    private final DoctorApplicationRepository doctorApplicationRepository;
    private final UserRepository userRepository;
    private final AdminDoctorApplicationMapper mapper;

    public AdminDoctorServiceImpl(
            DoctorApplicationRepository doctorApplicationRepository,
            UserRepository userRepository,
            AdminDoctorApplicationMapper mapper
    ) {
        this.doctorApplicationRepository = doctorApplicationRepository;
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    // ✅ RETURN DTO LIST
    @Override
    public List<AdminDoctorApplicationResponse> getPendingApplications() {

        return doctorApplicationRepository
                .findByStatus(ApplicationStatus.PENDING)
                .stream()
                .map(mapper::toDto)
                .toList();
    }

    // ✅ APPROVE
    @Override
    @Transactional
    public void approveApplication(UUID applicationId) {

        DoctorApplication application =
                doctorApplicationRepository.findById(applicationId)
                        .orElseThrow(() -> new AppException("Application not found"));

        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new AppException("Application already processed");
        }

        application.setStatus(ApplicationStatus.APPROVED);
        application.setRejectReason(null);
        application.setReviewedAt(LocalDateTime.now());

        User user = application.getUser();
        user.setRole(Role.DOCTOR);

        userRepository.save(user);
        doctorApplicationRepository.save(application);
    }

    // ✅ REJECT
    @Override
    @Transactional
    public void rejectApplication(UUID applicationId, String reason) {

        DoctorApplication application =
                doctorApplicationRepository.findById(applicationId)
                        .orElseThrow(() -> new AppException("Application not found"));

        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new AppException("Application already processed");
        }

        application.setStatus(ApplicationStatus.REJECTED);
        application.setRejectReason(reason);
        application.setReviewedAt(LocalDateTime.now());

        doctorApplicationRepository.save(application);
    }
}