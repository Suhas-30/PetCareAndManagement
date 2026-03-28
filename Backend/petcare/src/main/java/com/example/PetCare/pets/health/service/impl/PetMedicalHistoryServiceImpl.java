package com.example.PetCare.pets.health.service.impl;

import com.example.PetCare.pets.domain.Pet;
import com.example.PetCare.pets.health.domain.MedicalRecordType;
import com.example.PetCare.pets.health.domain.PetMedicalHistory;
import com.example.PetCare.pets.health.repository.PetMedicalHistoryRepository;
import com.example.PetCare.pets.health.service.PetMedicalHistoryService;
import com.example.PetCare.pets.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PetMedicalHistoryServiceImpl implements PetMedicalHistoryService {

    private final PetMedicalHistoryRepository historyRepository;
    private final PetRepository petRepository;

    /* =========================================================
       COMMON VALIDATION METHOD (VERY IMPORTANT)
       ========================================================= */

    private Pet validatePetOwnership(UUID petId, String userEmail) {

        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        // assuming Pet has getUser().getEmail()
        if (!pet.getUser().getEmail().equals(userEmail)) {
            throw new AccessDeniedException("You do not own this pet");
        }

        return pet;
    }

    /* ---------------- GET ---------------- */

    @Override
    public List<PetMedicalHistory> getByPet(UUID petId, String userEmail) {

        validatePetOwnership(petId, userEmail);

        return historyRepository.findByPetId(petId);
    }

    /* ---------------- CREATE ---------------- */

    @Override
    public PetMedicalHistory create(UUID petId,
                                    PetMedicalHistory history,
                                    String userEmail) {

        Pet pet = validatePetOwnership(petId, userEmail);

        history.setPet(pet);

        return historyRepository.save(history);
    }

    /* ---------------- UPDATE ---------------- */

    @Override
    public PetMedicalHistory update(UUID id,
                                    PetMedicalHistory updated,
                                    String userEmail) {

        PetMedicalHistory existing = historyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        // ownership check through pet
        validatePetOwnership(existing.getPet().getId(), userEmail);

        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setTreatedDate(updated.getTreatedDate());
        existing.setType(updated.getType());

        return historyRepository.save(existing);
    }

    /* ---------------- DELETE ---------------- */

    @Override
    public void delete(UUID id, String userEmail) {

        PetMedicalHistory history = historyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        // ownership validation
        validatePetOwnership(history.getPet().getId(), userEmail);

        // ✅ allow deleting any record type
        historyRepository.delete(history);
    }
}