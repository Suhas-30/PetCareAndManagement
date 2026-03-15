package com.example.PetCare.booking.marketplace.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@AllArgsConstructor
public class CartResponseDTO {

    private UUID productId;
    private String name;
    private BigDecimal price;
    private String imageUrl;
    private Integer quantity;
}