package com.example.PetCare.admin.mapper;

import com.example.PetCare.admin.dto.AdminDoctorApplicationResponse;
import com.example.PetCare.doctor.domain.DoctorApplication;
import org.springframework.stereotype.Component;

@Component
public class AdminDoctorApplicationMapper {

    public AdminDoctorApplicationResponse toDto(DoctorApplication app) {

        AdminDoctorApplicationResponse dto =
                new AdminDoctorApplicationResponse();

        dto.setId(app.getId());

        dto.setFullName(app.getUser().getFullName());
        dto.setEmail(app.getUser().getEmail());

        dto.setSpecialization(app.getSpecialization());
        dto.setYearsOfExperience(app.getYearsOfExperience());
        dto.setLicenseNumber(app.getLicenseNumber());

        dto.setClinicName(app.getClinicName());
        dto.setPhone(app.getPhone());
        dto.setClinicEmail(app.getClinicEmail());

        dto.setAddress1(app.getAddress1());
        dto.setAddress2(app.getAddress2());
        dto.setArea(app.getArea());
        dto.setCity(app.getCity());
        dto.setState(app.getState());
        dto.setPincode(app.getPincode());

        dto.setConsultationType(app.getConsultationType());

        // ✅ expose public pdf endpoint
        dto.setCertificateUrl(
                "/uploads/certificates/" + app.getCertificatePath()
        );

        return dto;
    }
}