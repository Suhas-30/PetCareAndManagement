package com.example.PetCare.booking.marketplace.dto;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class CreateOrderRequest {

    private List<UUID> items;   // productIds
    private UUID addressId;

}