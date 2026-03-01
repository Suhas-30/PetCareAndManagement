package com.example.PetCare.pets.health.service;

import com.example.PetCare.pets.health.domain.PetMedicalHistory;

import java.util.List;
import java.util.UUID;

public interface PetMedicalHistoryService {

    List<PetMedicalHistory> getByPet(UUID petId, String userEmail);

    PetMedicalHistory create(UUID petId, PetMedicalHistory history, String userEmail);

    PetMedicalHistory update(UUID id, PetMedicalHistory history, String userEmail);

    void delete(UUID id, String userEmail);
}