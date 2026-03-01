package com.example.PetCare.doctor.mapper;

import com.example.PetCare.doctor.domain.ApplicationStatus;
import com.example.PetCare.doctor.domain.DoctorApplication;
import com.example.PetCare.doctor.dto.DoctorApplicationRequest;
import com.example.PetCare.user.domain.User;
import org.springframework.stereotype.Component;

@Component
public class DoctorApplicationMapper {

    public DoctorApplication toEntity(
            DoctorApplicationRequest request,
            User user,
            String certificatePath
    ) {

        DoctorApplication application = new DoctorApplication();

        application.setUser(user);
        application.setLicenseNumber(request.getLicenseNumber());
        application.setSpecialization(request.getSpecialization());
        application.setYearsOfExperience(request.getYearsOfExperience());

        // new file path
        application.setCertificatePath(certificatePath);

        application.setStatus(ApplicationStatus.PENDING);

        return application;
    }
}