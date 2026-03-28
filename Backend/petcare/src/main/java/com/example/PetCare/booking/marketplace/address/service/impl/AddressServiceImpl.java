package com.example.PetCare.booking.marketplace.address.service.impl;

import com.example.PetCare.booking.marketplace.address.domain.Address;
import com.example.PetCare.booking.marketplace.address.repository.AddressRepository;
import com.example.PetCare.booking.marketplace.address.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    @Override
    public List<Address> getUserAddresses(UUID userId) {
        return addressRepository.findByUserId(userId);
    }

    @Override
    public Address save(Address address) {
        return addressRepository.save(address);
    }

    @Override
    public Address update(UUID id, Address address) {

        Address existing = addressRepository.findById(id)
                .orElseThrow();

        existing.setFullName(address.getFullName());
        existing.setPhone(address.getPhone());
        existing.setLine1(address.getLine1());
        existing.setLine2(address.getLine2());
        existing.setCity(address.getCity());
        existing.setState(address.getState());
        existing.setPincode(address.getPincode());

        return addressRepository.save(existing);
    }

    @Override
    public void delete(UUID id) {
        addressRepository.deleteById(id);
    }
}