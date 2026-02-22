package com.example.PetCare.pets.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    String savePetImage(MultipartFile file);
}
