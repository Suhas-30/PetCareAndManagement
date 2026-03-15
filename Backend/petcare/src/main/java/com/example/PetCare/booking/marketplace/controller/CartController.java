package com.example.PetCare.booking.marketplace.controller;

import com.example.PetCare.booking.marketplace.service.CartService;
import com.example.PetCare.common.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    /* ---------- ADD TO CART ---------- */
    @PostMapping("/add")
    public void addToCart(
            @RequestParam UUID productId,
            @RequestParam(defaultValue = "1") Integer quantity,
            @AuthenticationPrincipal UserPrincipal user
    ) {
        cartService.addToCart(user.getId(), productId, quantity);
    }

    /* ---------- GET CART ---------- */
    @GetMapping
    public Object getCart(@AuthenticationPrincipal UserPrincipal user) {
        return cartService.getCart(user.getId());
    }

    /* ---------- INCREASE ---------- */
    @PostMapping("/increase")
    public void increaseQty(
            @RequestParam UUID productId,
            @AuthenticationPrincipal UserPrincipal user
    ) {
        cartService.increaseQty(user.getId(), productId);
    }

    /* ---------- DECREASE ---------- */
    @PostMapping("/decrease")
    public void decreaseQty(
            @RequestParam UUID productId,
            @AuthenticationPrincipal UserPrincipal user
    ) {
        cartService.decreaseQty(user.getId(), productId);
    }

    /* ---------- REMOVE ---------- */
    @DeleteMapping("/remove")
    public void removeItem(
            @RequestParam UUID productId,
            @AuthenticationPrincipal UserPrincipal user
    ) {
        cartService.removeItem(user.getId(), productId);
    }
}