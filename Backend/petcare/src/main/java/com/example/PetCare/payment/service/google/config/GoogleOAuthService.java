package com.example.PetCare.payment.service.google.config;

import com.google.api.client.auth.oauth2.Credential;
//import com.google.api.client.extensions.java6.auth.oauth2.GoogleAuthorizationCodeFlow;
//import com.google.api.client.extensions.java6.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.util.store.FileDataStoreFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

@Service
public class GoogleOAuthService {

    @Value("${google.oauth2.client-id}")
    private String clientId;

    @Value("${google.oauth2.client-secret}")
    private String clientSecret;

    @Value("${google.oauth2.redirect-uri}")
    private String redirectUri;

    private static final String TOKENS_PATH = "tokens";

    public String getAuthorizationUrl() throws Exception {
        GoogleAuthorizationCodeFlow flow = buildFlow();
        return flow.newAuthorizationUrl()
                .setRedirectUri(redirectUri)
                .setAccessType("offline")
                .build();
    }

    public void exchangeCodeForTokens(String code) throws Exception {
        GoogleAuthorizationCodeFlow flow = buildFlow();
        GoogleAuthorizationCodeTokenRequest tokenRequest = flow.newTokenRequest(code)
                .setRedirectUri(redirectUri);
        GoogleTokenResponse tokenResponse = tokenRequest.execute();
        flow.createAndStoreCredential(tokenResponse, "user");
        System.out.println("✅ Tokens saved successfully!");
    }

    public Credential loadCredential() throws Exception {
        GoogleAuthorizationCodeFlow flow = buildFlow();
        return flow.loadCredential("user");
    }

    private GoogleAuthorizationCodeFlow buildFlow() throws Exception {
        return new GoogleAuthorizationCodeFlow.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                clientId,
                clientSecret,
                List.of(CalendarScopes.CALENDAR))
                .setDataStoreFactory(new FileDataStoreFactory(new File(TOKENS_PATH)))
                .setAccessType("offline")
                .build();
    }
}