package com.example.PetCare.doctor.service.impl;

import com.example.PetCare.common.exception.AppException;
import com.example.PetCare.doctor.domain.ApplicationStatus;
import com.example.PetCare.doctor.domain.DoctorApplication;
import com.example.PetCare.doctor.dto.DoctorApplicationRequest;
import com.example.PetCare.doctor.dto.DoctorApplicationStatusResponse;
import com.example.PetCare.doctor.dto.PublicDoctorCardResponse;
import com.example.PetCare.doctor.repository.DoctorApplicationRepository;
import com.example.PetCare.doctor.service.DoctorService;
import com.example.PetCare.doctor.service.FileStorageService;
import com.example.PetCare.user.domain.Role;
import com.example.PetCare.user.domain.User;
import com.example.PetCare.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final UserRepository userRepository;
    private final DoctorApplicationRepository doctorApplicationRepository;
    private final FileStorageService fileStorageService;

    public DoctorServiceImpl(
            UserRepository userRepository,
            DoctorApplicationRepository doctorApplicationRepository,
            FileStorageService fileStorageService
    ) {
        this.userRepository = userRepository;
        this.doctorApplicationRepository = doctorApplicationRepository;
        this.fileStorageService = fileStorageService;
    }

    @Override
    public String applyForDoctor(DoctorApplicationRequest request, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("User Not found"));

        // already doctor check
        if (user.getRole() == Role.DOCTOR) {
            throw new AppException("You are already a doctor");
        }

        // pending application check
        boolean alreadyPending =
                doctorApplicationRepository
                        .existsByUser_IdAndStatus(
                                user.getId(),
                                ApplicationStatus.PENDING
                        );

        if (alreadyPending) {
            throw new AppException("You already have a pending application");
        }

        // ✅ save certificate file
        String certificatePath =
                fileStorageService.saveCertificate(
                        request.getCertificateFile()
                );

        // create application
        DoctorApplication application = new DoctorApplication();
        application.setUser(user);
        application.setLicenseNumber(request.getLicenseNumber());
        application.setSpecialization(request.getSpecialization());
        application.setYearsOfExperience(request.getYearsOfExperience());

        // ✅ new stored file path
        application.setCertificatePath(certificatePath);

        // clinic details
        application.setClinicName(request.getClinicName());
        application.setPhone(request.getPhone());
        application.setClinicEmail(request.getClinicEmail());
        application.setAddress1(request.getAddress1());
        application.setAddress2(request.getAddress2());
        application.setArea(request.getArea());
        application.setCity(request.getCity());
        application.setState(request.getState());
        application.setPincode(request.getPincode());
        application.setConsultationType(request.getConsultationType());

        application.setStatus(ApplicationStatus.PENDING);

        doctorApplicationRepository.save(application);

        return "Doctor application submitted successfully";
    }

    @Override
    public DoctorApplicationStatusResponse getMyApplicationStatus(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("User not found"));

        Optional<DoctorApplication> optionalApplication =
                doctorApplicationRepository
                        .findTopByUser_IdOrderByCreatedAtDesc(user.getId());

        if (optionalApplication.isEmpty()) {
            return null;
        }

        DoctorApplication application = optionalApplication.get();

        DoctorApplicationStatusResponse response =
                new DoctorApplicationStatusResponse();

        response.setStatus(application.getStatus().name());
        response.setRejectReason(application.getRejectionReason());

        return response;
    }

    @Override
    public String withdrawApplication(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("User not found"));

        DoctorApplication application =
                doctorApplicationRepository
                        .findTopByUser_IdOrderByCreatedAtDesc(user.getId())
                        .orElseThrow(() -> new AppException("No Application Found"));

        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new AppException("Only pending application can be withdrawn");
        }

        application.setStatus(ApplicationStatus.WITHDRAW);
        doctorApplicationRepository.save(application);

        return "Application withdraw successfully";
    }


    public List<PublicDoctorCardResponse> getMarketplaceDoctors() {

        return doctorApplicationRepository
                .findApprovedDoctors()
                .stream()
                .map(PublicDoctorCardResponse::from)
                .toList();
    }

}