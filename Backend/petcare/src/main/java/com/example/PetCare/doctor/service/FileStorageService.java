package com.example.PetCare.doctor.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    String saveCertificate(MultipartFile file);
}
