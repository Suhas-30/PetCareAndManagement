package com.example.PetCare.pets.service.impl;

import com.example.PetCare.common.exception.AppException;
import com.example.PetCare.pets.service.FileStorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private static final String UPLOAD_DIR =
            System.getProperty("user.dir") + File.separator +
                    "uploads" + File.separator + "pets";

    @Override
    public String savePetImage(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            return null;
        }

        try {
            File directory = new File(UPLOAD_DIR);

            if (!directory.exists()) {
                directory.mkdirs();
            }

            String fileName =
                    UUID.randomUUID() + "_" + file.getOriginalFilename();

            File destination = new File(directory, fileName);

            file.transferTo(destination);

            return fileName;

        } catch (IOException e) {
            e.printStackTrace(); // 👈 add temporarily for debugging
            throw new AppException("Failed to store image");
        }
    }
}