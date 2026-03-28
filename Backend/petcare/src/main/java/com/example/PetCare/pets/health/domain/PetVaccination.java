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
@Table(name = "pet_vaccinations")
public class PetVaccination {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /* ---------------- PET RELATION ---------------- */

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "pet_id", nullable = false)
    @JsonIgnore
    private Pet pet;

    /* ---------------- VACCINATION DATA ---------------- */

    @Column(nullable = false)
    private String vaccineName;

    @Column(nullable = false)
    private Integer totalDoses;

    @Column(nullable = false)
    private Integer completedDoses;

    /* FRONTEND ONLY FIELD */
    @Transient
    private LocalDate lastDoseDate;

    private LocalDate nextDueDate;

    /* ---------------- AUDIT ---------------- */

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}