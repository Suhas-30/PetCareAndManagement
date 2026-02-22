package com.example.PetCare.pets.controller;

import com.example.PetCare.common.response.ApiResponse;
import com.example.PetCare.common.security.UserPrincipal;
import com.example.PetCare.pets.domain.Pet;
import com.example.PetCare.pets.dto.PetCreateRequest;
import com.example.PetCare.pets.dto.PetCreateResponse;
import com.example.PetCare.pets.service.PetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pets")

@PreAuthorize("hasRole('USER')")
public class PetController {
    private final PetService petService;
    public PetController(PetService petService){
        this.petService = petService;
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<PetCreateResponse> createPet(
            @AuthenticationPrincipal UserPrincipal user,
            @ModelAttribute PetCreateRequest request
            ){
        String email = user.getEmail();
        PetCreateResponse response = petService.createPet(request, email);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<PetCreateResponse>> getMyPets(
            @AuthenticationPrincipal UserPrincipal user
    ){

        return ResponseEntity.ok(petService.getMyPets(user.getEmail()));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getPetCount(
            @AuthenticationPrincipal UserPrincipal user
    ){
        return ResponseEntity.ok(petService.getPetCount(user.getEmail()));
    }


    @GetMapping("/{petId}")
    public ResponseEntity<?> getPetById(){
        return null;
    }

    @PutMapping("/{petId}")
    public ResponseEntity<?> updatePet(){
        return null;
    }

    @DeleteMapping("/{petId}")
    public ResponseEntity<?> deletePet(){
        return null;
    }



}
