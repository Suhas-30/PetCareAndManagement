package com.example.PetCare.pets.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PetCreateResponse {
    private UUID id;
    private String name;
    private String species;
    private String breed;
    private String gender;
    private LocalDate dob;
    private Double weight;
    private String imageUrl;
}
