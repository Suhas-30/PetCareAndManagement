package com.example.PetCare.pets.health.domain;

import com.example.PetCare.pets.domain.Pet;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "pet_medical_history")

public class PetMedicalHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /* ---------------- PET RELATION ---------------- */

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "pet_id", nullable = false)
    @JsonIgnore
    private Pet pet;

    /* ---------------- MEDICAL DATA ---------------- */

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MedicalRecordType type;   // ILLNESS / SURGERY

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDate treatedDate;

    /* ---------------- AUDIT ---------------- */

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}