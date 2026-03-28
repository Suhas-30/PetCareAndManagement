package com.example.PetCare.pets.health.service;

import com.example.PetCare.pets.health.domain.PetVaccination;

import java.util.List;
import java.util.UUID;

public interface PetVaccinationService {

    List<PetVaccination> getByPet(UUID petId, String userEmail);

    PetVaccination create(UUID petId,
                          PetVaccination vaccination,
                          String userEmail);

    PetVaccination update(UUID id,
                          PetVaccination vaccination,
                          String userEmail);

    void delete(UUID id, String userEmail);
}