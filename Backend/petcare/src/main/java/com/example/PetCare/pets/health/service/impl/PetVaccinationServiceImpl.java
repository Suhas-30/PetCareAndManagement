package com.example.PetCare.pets.health.service.impl;

import com.example.PetCare.pets.domain.Pet;
import com.example.PetCare.pets.health.domain.PetVaccination;
import com.example.PetCare.pets.health.repository.PetVaccinationRepository;
import com.example.PetCare.pets.health.service.PetVaccinationService;
import com.example.PetCare.pets.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PetVaccinationServiceImpl implements PetVaccinationService {

    private final PetVaccinationRepository vaccinationRepository;
    private final PetRepository petRepository;

    /* ================= VACCINE GAP RULE ================= */

    private static final Map<String, Integer> VACCINE_INTERVAL = Map.of(
            "Rabies", 30,
            "DHPP", 21,
            "Parvo", 21,
            "Distemper", 28
    );

    private LocalDate calculateNextDueDate(String vaccineName,
                                           LocalDate lastDoseDate) {

        if (lastDoseDate == null) return null;

        Integer gap = VACCINE_INTERVAL.getOrDefault(vaccineName, 30);

        return lastDoseDate.plusDays(gap);
    }

    /* ================= OWNERSHIP ================= */

    private Pet validatePetOwnership(UUID petId, String userEmail) {

        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        if (!pet.getUser().getEmail().equals(userEmail)) {
            throw new AccessDeniedException("You do not own this pet");
        }

        return pet;
    }

    /* ---------------- GET ---------------- */

    @Override
    public List<PetVaccination> getByPet(UUID petId, String userEmail) {

        validatePetOwnership(petId, userEmail);

        return vaccinationRepository.findByPetId(petId);
    }

    /* ---------------- CREATE ---------------- */

    @Override
    public PetVaccination create(UUID petId,
                                 PetVaccination vaccination,
                                 String userEmail) {

        Pet pet = validatePetOwnership(petId, userEmail);

        vaccination.setPet(pet);

        vaccination.setNextDueDate(
                calculateNextDueDate(
                        vaccination.getVaccineName(),
                        vaccination.getLastDoseDate()
                )
        );

        return vaccinationRepository.save(vaccination);
    }

    /* ---------------- UPDATE ---------------- */

    @Override
    public PetVaccination update(UUID id,
                                 PetVaccination updated,
                                 String userEmail) {

        PetVaccination existing = vaccinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vaccination not found"));

        validatePetOwnership(existing.getPet().getId(), userEmail);

        existing.setVaccineName(updated.getVaccineName());
        existing.setTotalDoses(updated.getTotalDoses());
        existing.setCompletedDoses(updated.getCompletedDoses());

        existing.setNextDueDate(
                calculateNextDueDate(
                        updated.getVaccineName(),
                        updated.getLastDoseDate()
                )
        );

        return vaccinationRepository.save(existing);
    }

    /* ---------------- DELETE ---------------- */

    @Override
    public void delete(UUID id, String userEmail) {

        PetVaccination vaccination = vaccinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vaccination not found"));

        validatePetOwnership(vaccination.getPet().getId(), userEmail);

        vaccinationRepository.delete(vaccination);
    }
}