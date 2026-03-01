package com.example.PetCare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.example.PetCare")
public class PetCareApplication {
    public static void main(String[] args) {
        SpringApplication.run(PetCareApplication.class, args);
    }
}
