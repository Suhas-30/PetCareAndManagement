package com.example.PetCare.booking.marketplace.repository;

import com.example.PetCare.booking.marketplace.domain.Cart;
import com.example.PetCare.booking.marketplace.domain.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CartItemRepository extends JpaRepository<CartItem, UUID> {

    Optional<CartItem> findByCartAndProductId(Cart cart, UUID productId);

    List<CartItem> findByCart(Cart cart);
}