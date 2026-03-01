package com.example.PetCare.pets.health.controller;

import com.example.PetCare.common.security.UserPrincipal;
import com.example.PetCare.pets.health.domain.PetVaccination;
import com.example.PetCare.pets.health.service.PetVaccinationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping()
@RequiredArgsConstructor
public class PetVaccinationController {

    private final PetVaccinationService vaccinationService;

    @GetMapping("/pets/{petId}/vaccinations")
    public ResponseEntity<List<PetVaccination>> getByPet(
            @PathVariable UUID petId,
            @AuthenticationPrincipal UserPrincipal user
    ) {
        return ResponseEntity.ok(
                vaccinationService.getByPet(petId, user.getEmail())
        );
    }

    @PostMapping("/pets/{petId}/vaccinations")
    public ResponseEntity<PetVaccination> create(
            @PathVariable UUID petId,
            @RequestBody PetVaccination vaccination,
            @AuthenticationPrincipal UserPrincipal user
    ) {
        return ResponseEntity.ok(
                vaccinationService.create(petId, vaccination, user.getEmail())
        );
    }

    @PutMapping("/vaccinations/{id}")
    public ResponseEntity<PetVaccination> update(
            @PathVariable UUID id,
            @RequestBody PetVaccination vaccination,
            @AuthenticationPrincipal UserPrincipal user
    ) {
        return ResponseEntity.ok(
                vaccinationService.update(id, vaccination, user.getEmail())
        );
    }

    @DeleteMapping("/vaccinations/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserPrincipal user
    ) {
        vaccinationService.delete(id, user.getEmail());
        return ResponseEntity.ok().build();
    }
}