package com.example.PetCare.booking.marketplace.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ProductResponseDTO {

    private UUID id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private String category;
    private String imageUrl;
    private LocalDateTime createdAt;
}