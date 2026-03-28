package com.example.PetCare.booking.marketplace.service;

import com.example.PetCare.booking.marketplace.dto.CartResponseDTO;

import java.util.List;
import java.util.UUID;

public interface CartService {

    void addToCart(UUID userId, UUID productId, Integer quantity);

    void increaseQty(UUID userId, UUID productId);

    void decreaseQty(UUID userId, UUID productId);

    void removeItem(UUID userId, UUID productId);

    List<CartResponseDTO> getCart(UUID userId);
}