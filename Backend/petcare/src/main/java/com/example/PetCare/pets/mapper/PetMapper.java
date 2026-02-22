package com.example.PetCare.pets.mapper;

import com.example.PetCare.pets.domain.Pet;
import com.example.PetCare.pets.dto.PetCreateRequest;
import com.example.PetCare.pets.dto.PetCreateResponse;
import com.example.PetCare.user.domain.User;

public class PetMapper {

    public static Pet toEntity(PetCreateRequest request,
                               User user,
                               String imagePath
    ){
        return Pet.builder()
                .user(user)
                .name(request.getName())
                .species(request.getSpecies())
                .breed(request.getBreed())
                .gender(request.getGender())
                .dob(request.getDob())
                .weight(request.getWeight())
                .imageUrl(imagePath)
                .build();
    }

    public static PetCreateResponse toResponse(Pet pet){
        return PetCreateResponse.builder()
                .id(pet.getId())
                .name(pet.getName())
                .species(pet.getSpecies())
                .breed(pet.getBreed())
                .gender(pet.getGender())
                .dob(pet.getDob())
                .weight(pet.getWeight())
                .imageUrl(pet.getImageUrl())
                .build();
    }

}
