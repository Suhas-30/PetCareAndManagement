package com.example.PetCare.booking.marketplace.controller;

import com.example.PetCare.booking.marketplace.dto.ProductRequestDTO;
import com.example.PetCare.booking.marketplace.dto.ProductResponseDTO;
import com.example.PetCare.booking.marketplace.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/admin/products")
@RequiredArgsConstructor
public class ProductAdminController {

    private final ProductService productService;

    @PostMapping
    public ProductResponseDTO addProduct(@RequestBody ProductRequestDTO request) {
        return productService.addProduct(request);
    }

    @GetMapping
    public List<ProductResponseDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ProductResponseDTO getProductById(@PathVariable UUID id) {
        return productService.getProductById(id);
    }

    @PutMapping("/{id}")
    public ProductResponseDTO updateProduct(
            @PathVariable UUID id,
            @RequestBody ProductRequestDTO request
    ) {
        return productService.updateProduct(id, request);
    }
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable UUID id) {
        productService.deleteProduct(id);
    }

    @PostMapping("/upload-image")
    public String uploadImage(@RequestParam("file") MultipartFile file){
        try{
            String uploadDir = "uploads/products/";
            File dir  = new File(uploadDir);
            if(!dir.exists()){
                dir.mkdirs();
            }

            String  fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/products/" + fileName;
        }catch (Exception e){
            throw new RuntimeException("Image upload failed");
        }
    }
}