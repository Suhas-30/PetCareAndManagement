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

    // ---------------- USER ----------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // ---------------- DOCTOR INFO ----------------
    @Column(nullable = false)
    private String licenseNumber;

    @Column(nullable = false)
    private String specialization;

    @Column(nullable = false)
    private Integer yearsOfExperience;

    // stored uploaded certificate
    @Column(name = "certificate_path", nullable = false)
    private String certificatePath;

    // ---------------- CLINIC INFO ----------------
    @Column(nullable = false)
    private String clinicName;

    @Column(nullable = false)
    private String phone;

    private String clinicEmail;

    @Column(nullable = false)
    private String address1;

    private String address2;

    @Column(nullable = false)
    private String area;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String pincode;

    @Column(nullable = false)
    private String consultationType;

    // ---------------- APPLICATION STATUS ----------------
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    private String rejectionReason;

    private LocalDateTime createdAt;

    private LocalDateTime reviewedAt;

    private UUID reviewedBy;

    @Column(name = "reject_reason")
    private String rejectReason;

    // ---------------- DEFAULT VALUES ----------------
    public DoctorApplication() {
        this.status = ApplicationStatus.PENDING;
        this.createdAt = LocalDateTime.now();
    }

    public void markReviewed(UUID adminId) {
        this.reviewedBy = adminId;
        this.reviewedAt = LocalDateTime.now();
    }
}