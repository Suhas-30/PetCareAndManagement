package com.example.PetCare.booking.marketplace.controller;

import com.example.PetCare.booking.marketplace.dto.ProductResponseDTO;
import com.example.PetCare.booking.marketplace.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductUserController {

    private final ProductService productService;

    @GetMapping
    public List<ProductResponseDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ProductResponseDTO getProductById(@PathVariable UUID id) {
        return productService.getProductById(id);
    }
}