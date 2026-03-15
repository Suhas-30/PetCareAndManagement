package com.example.PetCare.booking.marketplace.address.service;

import com.example.PetCare.booking.marketplace.address.domain.Address;

import java.util.List;
import java.util.UUID;

public interface AddressService {

    List<Address> getUserAddresses(UUID userId);

    Address save(Address address);

    Address update(UUID id, Address address);   // ✅ ADD

    void delete(UUID id);

}