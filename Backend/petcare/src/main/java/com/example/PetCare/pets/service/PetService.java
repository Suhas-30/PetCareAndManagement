package com.example.PetCare.pets.service;

import com.example.PetCare.pets.dto.PetCreateRequest;
import com.example.PetCare.pets.dto.PetCreateResponse;

import java.util.List;

public interface PetService {
    PetCreateResponse createPet(PetCreateRequest request, String email);

    List<PetCreateResponse> getMyPets(String email);

    long getPetCount(String email);

}
