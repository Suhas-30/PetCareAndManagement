package com.example.PetCare.doctor.service.impl;

import com.example.PetCare.common.exception.AppException;
import com.example.PetCare.doctor.service.FileStorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class DoctorFileStorageServiceImpl implements FileStorageService {
    private final String UPLOAD_DIR = "uploads/certificates/";

    @Override
    public String saveCertificate(MultipartFile file) {

        try {
            // create directory if not exists
            Files.createDirectories(Paths.get(UPLOAD_DIR));

            // generate unique filename
            String fileName =
                    UUID.randomUUID() + "_" + file.getOriginalFilename();

            Path filePath = Paths.get(UPLOAD_DIR, fileName);

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            return fileName;

        } catch (Exception e) {
            throw new AppException("Certificate upload failed");
        }
    }
}
