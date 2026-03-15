package com.example.PetCare.pets.service;

import com.example.PetCare.pets.dto.PetCreateRequest;
import com.example.PetCare.pets.dto.PetCreateResponse;
import com.example.PetCare.pets.dto.PetDropdownDto;

import java.util.List;
import java.util.UUID;

public interface PetService {
    PetCreateResponse createPet(PetCreateRequest request, String email);

    List<PetCreateResponse> getMyPets(String email);

    long getPetCount(String email);

    void deletePet(UUID petId, String email);

    List<PetDropdownDto> getPetNameAndId(UUID userId);

}
