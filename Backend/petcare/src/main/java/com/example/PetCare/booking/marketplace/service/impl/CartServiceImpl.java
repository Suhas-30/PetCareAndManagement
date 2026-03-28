package com.example.PetCare.booking.marketplace.service.impl;

import com.example.PetCare.booking.marketplace.domain.Cart;
import com.example.PetCare.booking.marketplace.domain.CartItem;
import com.example.PetCare.booking.marketplace.dto.CartResponseDTO;
import com.example.PetCare.booking.marketplace.repository.CartItemRepository;
import com.example.PetCare.booking.marketplace.repository.CartRepository;
import com.example.PetCare.booking.marketplace.repository.ProductRepository;
import com.example.PetCare.booking.marketplace.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    /* ---------- ADD TO CART ---------- */
    @Override
    public void addToCart(UUID userId, UUID productId, Integer quantity) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart c = new Cart();
                    c.setUserId(userId);
                    return cartRepository.save(c);
                });

        CartItem item = cartItemRepository
                .findByCartAndProductId(cart, productId)
                .orElse(null);

        if (item != null) {
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            var product = productRepository.findById(productId).orElseThrow();

            item = new CartItem();
            item.setCart(cart);
            item.setProductId(productId);
            item.setQuantity(quantity);
            item.setPrice(product.getPrice().intValue()); // convert BigDecimal → Integer
        }

        cartItemRepository.save(item);
    }

    /* ---------- INCREASE ---------- */
    @Override
    public void increaseQty(UUID userId, UUID productId) {

        Cart cart = cartRepository.findByUserId(userId).orElseThrow();

        CartItem item = cartItemRepository
                .findByCartAndProductId(cart, productId)
                .orElseThrow();

        item.setQuantity(item.getQuantity() + 1);
        cartItemRepository.save(item);
    }

    /* ---------- DECREASE ---------- */
    @Override
    public void decreaseQty(UUID userId, UUID productId) {

        Cart cart = cartRepository.findByUserId(userId).orElseThrow();

        CartItem item = cartItemRepository
                .findByCartAndProductId(cart, productId)
                .orElseThrow();

        if (item.getQuantity() <= 1) {
            cartItemRepository.delete(item);
        } else {
            item.setQuantity(item.getQuantity() - 1);
            cartItemRepository.save(item);
        }
    }

    /* ---------- REMOVE ---------- */
    @Override
    public void removeItem(UUID userId, UUID productId) {

        Cart cart = cartRepository.findByUserId(userId).orElseThrow();

        CartItem item = cartItemRepository
                .findByCartAndProductId(cart, productId)
                .orElseThrow();

        cartItemRepository.delete(item);
    }

    /* ---------- GET CART ---------- */
    @Override
    public List<CartResponseDTO> getCart(UUID userId) {

        Cart cart = cartRepository.findByUserId(userId).orElse(null);

        if (cart == null) return List.of();

        List<CartItem> items = cartItemRepository.findByCart(cart);

        return items.stream().map(i -> {
            var product = productRepository.findById(i.getProductId()).orElseThrow();

            return new CartResponseDTO(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    product.getImageUrl(),
                    i.getQuantity()
            );
        }).toList();
    }
}