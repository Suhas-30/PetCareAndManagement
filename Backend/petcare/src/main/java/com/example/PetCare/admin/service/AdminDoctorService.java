package com.example.PetCare.admin.service;

import java.util.UUID;

public interface AdminDoctorService {
    String approveDoctorApplication(UUID applicationId);

    String rejectDoctorApplication(UUID applicationId, String reason);
}
