package com.example.PetCare.pets.domain;

import com.example.PetCare.pets.health.domain.PetMedicalHistory;
import com.example.PetCare.pets.health.domain.PetVaccination;
import com.example.PetCare.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "pets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /* ---------------- OWNER ---------------- */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /* ---------------- BASIC INFO ---------------- */

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String species;

    private String breed;
    private String gender;
    private LocalDate dob;
    private Double weight;
    private String imageUrl;

    private LocalDateTime createdAt;

    /* ---------------- MEDICAL HISTORY RELATION ---------------- */

    @OneToMany(
            mappedBy = "pet",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<PetMedicalHistory> medicalHistories = new ArrayList<>();

    /* ---------------- VACCINATION RELATION ---------------- */

    @OneToMany(
            mappedBy = "pet",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<PetVaccination> vaccinations = new ArrayList<>();

    /* ---------------- AUDIT ---------------- */

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}