package com.example.PetCare.pets.repository;

import com.example.PetCare.pets.domain.Pet;
import com.example.PetCare.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PetRepository extends JpaRepository<Pet, UUID> {
    List<Pet> findByUser(User user);
    long countByUser(User user);

    List<Pet> findByUserId(UUID userId);
}
