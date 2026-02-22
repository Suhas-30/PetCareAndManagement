package com.example.PetCare.doctor.domain;


import com.example.PetCare.user.domain.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "doctor_applications")
@Data
public class DoctorApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String licenseNumber;

    @Column(nullable = false)
    private String specialization;

    @Column(nullable = false)
    private String documentUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    @Column(nullable = false)
    private Integer yearsOfExperience;

    private String rejectionReason;

    private LocalDateTime createdAt;

    private LocalDateTime reviewedAt;

    private UUID reviewedBy;

    public DoctorApplication() {
        this.status = ApplicationStatus.PENDING;
        this.createdAt = LocalDateTime.now();
    }

    private void setReviewedAt() {
        this.reviewedAt = LocalDateTime.now();
    }
}
