package com.example.PetCare.payment.service.google.config;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

import java.io.InputStream;
import java.util.List;

@Configuration
public class GoogleCalendarConfig {

    @Autowired
    private GoogleOAuthService googleOAuthService;

    @Bean
    @Lazy
    public Calendar googleCalendarClient() throws Exception {
        Credential credential = googleOAuthService.loadCredential();

        if (credential == null) {
            throw new IllegalStateException(
                    "Google OAuth2 not authorized yet. " +
                            "Please visit http://localhost:8080/oauth2/authorize first."
            );
        }

        return new Calendar.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                credential)
                .setApplicationName("PetCare")
                .build();
    }
}