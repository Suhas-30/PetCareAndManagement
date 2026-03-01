package com.example.PetCare.pets.service.impl;

import com.example.PetCare.common.exception.AppException;
import com.example.PetCare.pets.domain.Pet;
import com.example.PetCare.pets.dto.PetCreateRequest;
import com.example.PetCare.pets.dto.PetCreateResponse;
import com.example.PetCare.pets.mapper.PetMapper;
import com.example.PetCare.pets.repository.PetRepository;
import com.example.PetCare.pets.service.FileStorageService;
import com.example.PetCare.pets.service.PetService;
import com.example.PetCare.user.domain.User;
import com.example.PetCare.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class PetServiceImpl implements PetService {

    private final PetRepository petRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public PetServiceImpl(
            PetRepository petRepository,
            UserRepository userRepository,
            FileStorageService fileStorageService
    ) {
        this.petRepository = petRepository;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }

    @Override
    public PetCreateResponse createPet(PetCreateRequest request, String email) {

        // ✅ Fetch logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("User not found"));

        // ✅ Store image safely
        String imagePath = null;
        if (request.getImage() != null && !request.getImage().isEmpty()) {
            imagePath = fileStorageService.savePetImage(request.getImage());
        }

        // ✅ Map + save entity
        Pet pet = PetMapper.toEntity(request, user, imagePath);
        Pet savedPet = petRepository.save(pet);

        // ✅ Return response
        return PetMapper.toResponse(savedPet);
    }

    @Override
    public List<PetCreateResponse> getMyPets(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("User not found"));

        return petRepository.findByUser(user)
                .stream()
                .map(PetMapper::toResponse)
                .toList();
    }

    @Override
    public long getPetCount(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("User not found"));

        return petRepository.countByUser(user);
    }

    @Override
    @Transactional
    public void deletePet(UUID petId, String email) {

        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new AppException("Pet not found"));

        if (!pet.getUser().getEmail().equals(email)) {
            throw new AppException("You cannot delete this pet");
        }

        petRepository.delete(pet);
    }

}