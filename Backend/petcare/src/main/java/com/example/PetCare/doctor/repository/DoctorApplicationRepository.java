package com.example.PetCare.doctor.repository;

import com.example.PetCare.doctor.domain.ApplicationStatus;
import com.example.PetCare.doctor.domain.DoctorApplication;
import com.example.PetCare.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DoctorApplicationRepository
        extends JpaRepository<DoctorApplication, UUID> {

    // latest application of a user (VERY IMPORTANT for frontend)
    Optional<DoctorApplication>
    findTopByUser_IdOrderByCreatedAtDesc(UUID userId);

    // check if user already has pending application
    boolean existsByUser_IdAndStatus(UUID userId,
                                     ApplicationStatus status);

    Optional<DoctorApplication> findByUserAndStatus(User user, ApplicationStatus status);

    // admin usage (later)
    List<DoctorApplication> findByStatus(ApplicationStatus status);

            @Query("""
        SELECT da
        FROM DoctorApplication da
        JOIN FETCH da.user u
        WHERE da.status = com.example.PetCare.doctor.domain.ApplicationStatus.APPROVED
        AND u.userStatus = com.example.PetCare.user.domain.UserStatus.ACTIVE
        """)
    List<DoctorApplication> findApprovedDoctors();

    boolean existsByLicenseNumberAndStatusIn(
            String licenseNumber,
            List<ApplicationStatus> statuses
    );

}