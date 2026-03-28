package com.example.PetCare.booking.marketplace.service;

import com.example.PetCare.booking.marketplace.dto.ProductRequestDTO;
import com.example.PetCare.booking.marketplace.dto.ProductResponseDTO;

import java.util.List;
import java.util.UUID;

public interface ProductService {

    ProductResponseDTO addProduct(ProductRequestDTO request);

    List<ProductResponseDTO> getAllProducts();
    ProductResponseDTO getProductById(UUID id);
    ProductResponseDTO updateProduct(UUID id, ProductRequestDTO request);
    void deleteProduct(UUID id);
}