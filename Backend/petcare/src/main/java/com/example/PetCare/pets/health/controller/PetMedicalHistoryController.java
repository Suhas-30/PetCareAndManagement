package com.example.PetCare.pets.health.controller;

import com.example.PetCare.common.security.UserPrincipal;
import com.example.PetCare.pets.health.domain.PetMedicalHistory;
import com.example.PetCare.pets.health.service.PetMedicalHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping()
@RequiredArgsConstructor
public class PetMedicalHistoryController {

    private final PetMedicalHistoryService medicalHistoryService;

    /* -------- GET MEDICAL HISTORY -------- */

    @GetMapping("/pets/{petId}/medical-history")
    public ResponseEntity<List<PetMedicalHistory>> getByPet(
            @PathVariable UUID petId,
            @AuthenticationPrincipal UserPrincipal user
    ) {
        return ResponseEntity.ok(
                medicalHistoryService.getByPet(petId, user.getEmail())
        );
    }

    /* -------- CREATE -------- */

    @PostMapping("/pets/{petId}/medical-history")
    public ResponseEntity<PetMedicalHistory> create(
            @PathVariable UUID petId,
            @RequestBody PetMedicalHistory history,
            @AuthenticationPrincipal UserPrincipal user
    ) {
        return ResponseEntity.ok(
                medicalHistoryService.create(petId, history, user.getEmail())
        );
    }

    /* -------- UPDATE -------- */

    @PutMapping("/medical-history/{id}")
    public ResponseEntity<PetMedicalHistory> update(
            @PathVariable UUID id,
            @RequestBody PetMedicalHistory history,
            @AuthenticationPrincipal UserPrincipal user
    ) {
        return ResponseEntity.ok(
                medicalHistoryService.update(id, history, user.getEmail())
        );
    }

    /* -------- DELETE -------- */

    @DeleteMapping("/medical-history/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserPrincipal user
    ) {
        medicalHistoryService.delete(id, user.getEmail());
        return ResponseEntity.ok().build();
    }
}