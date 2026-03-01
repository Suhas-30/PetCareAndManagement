package com.example.PetCare.pets.health.repository;

import com.example.PetCare.pets.health.domain.PetMedicalHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PetMedicalHistoryRepository
        extends JpaRepository<PetMedicalHistory, UUID> {

    List<PetMedicalHistory> findByPetId(UUID petId);
}