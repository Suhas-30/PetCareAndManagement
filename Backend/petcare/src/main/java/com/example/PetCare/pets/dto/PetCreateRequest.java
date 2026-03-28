package com.example.PetCare.pets.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
public class PetCreateRequest {
    private String name;
    private String species;
    private String breed;
    private String gender;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dob;
    private Double weight;

    private MultipartFile image;
}
