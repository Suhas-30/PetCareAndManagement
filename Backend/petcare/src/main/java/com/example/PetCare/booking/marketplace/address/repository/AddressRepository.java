package com.example.PetCare.booking.marketplace.address.repository;

import com.example.PetCare.booking.marketplace.address.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AddressRepository extends JpaRepository<Address, UUID> {

    List<Address> findByUserId(UUID userId);
    Optional<Address> findById(UUID id);

}