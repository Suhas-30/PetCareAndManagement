package com.example.PetCare.booking.marketplace.service.impl;

import com.example.PetCare.booking.marketplace.domain.Product;
import com.example.PetCare.booking.marketplace.dto.ProductRequestDTO;
import com.example.PetCare.booking.marketplace.dto.ProductResponseDTO;
import com.example.PetCare.booking.marketplace.repository.ProductRepository;
import com.example.PetCare.booking.marketplace.service.ProductService;
import com.example.PetCare.common.exception.AppException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public ProductResponseDTO addProduct(ProductRequestDTO request) {

        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategory(request.getCategory());
        product.setImageUrl(request.getImageUrl());

        Product saved = productRepository.save(product);

        return mapToResponse(saved);
    }

    @Override
    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private ProductResponseDTO mapToResponse(Product product) {

        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setCategory(product.getCategory());
        dto.setImageUrl(product.getImageUrl());
        dto.setCreatedAt(product.getCreatedAt());

        return dto;
    }

    @Override
    public ProductResponseDTO getProductById(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException("Product not found"));

        return mapToResponse(product);
    }

    @Override
    public ProductResponseDTO updateProduct(UUID id, ProductRequestDTO request) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException("Product not found"));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategory(request.getCategory());
        product.setImageUrl(request.getImageUrl());

        Product updated = productRepository.save(product);

        return mapToResponse(updated);
    }

    @Override
    public void deleteProduct(UUID id) {

        if (!productRepository.existsById(id)) {
            throw new AppException("Product not found");
        }

        productRepository.deleteById(id);
    }

}