package com.example.PetCare.google.config;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.calendar.Calendar;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;
import java.util.Collections;

@Configuration
public class GoogleCalendarConfig {

    @Bean
    public Calendar googleCalendarService() throws Exception {

        InputStream credentialsStream =
                getClass().getResourceAsStream("/google-service-account.json");

        if (credentialsStream == null) {
            throw new RuntimeException("google-service-account.json not found in resources");
        }

        GoogleCredential credential = GoogleCredential
                .fromStream(credentialsStream)
                .createScoped(Collections.singleton("https://www.googleapis.com/auth/calendar"));

        return new Calendar.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JacksonFactory.getDefaultInstance(),
                credential
        ).setApplicationName("PetCare").build();
    }
}