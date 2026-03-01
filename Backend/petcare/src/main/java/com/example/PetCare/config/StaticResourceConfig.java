package com.example.PetCare.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // ✅ ABSOLUTE path to uploads folder
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(
                        "file:///C:/Users/LENOVO/Desktop/PerCare/Backend/uploads/"
                );
    }
}