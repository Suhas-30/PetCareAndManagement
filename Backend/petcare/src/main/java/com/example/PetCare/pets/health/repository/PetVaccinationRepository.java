package com.example.PetCare.pets.health.repository;

import com.example.PetCare.pets.health.domain.PetVaccination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PetVaccinationRepository
        extends JpaRepository<PetVaccination, UUID> {

    List<PetVaccination> findByPetId(UUID petId);
    List<PetVaccination> findByPetUserEmail(String email);
}