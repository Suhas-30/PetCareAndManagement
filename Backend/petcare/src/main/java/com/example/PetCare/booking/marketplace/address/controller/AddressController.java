package com.example.PetCare.booking.marketplace.address.controller;

import com.example.PetCare.booking.marketplace.address.domain.Address;
import com.example.PetCare.booking.marketplace.address.service.AddressService;
import com.example.PetCare.common.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    public List<Address> get(@AuthenticationPrincipal UserPrincipal user) {
        return addressService.getUserAddresses(user.getId());
    }

    @PostMapping
    public Address save(@RequestBody Address address,
                        @AuthenticationPrincipal UserPrincipal user) {

        address.setUserId(user.getId());
        return addressService.save(address);
    }

    @PutMapping("/{id}")
    public Address update(@PathVariable UUID id,
                          @RequestBody Address address,
                          @AuthenticationPrincipal UserPrincipal user) {

        address.setUserId(user.getId());
        return addressService.update(id, address);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        addressService.delete(id);
    }

}