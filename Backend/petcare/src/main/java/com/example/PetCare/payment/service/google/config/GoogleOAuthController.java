package com.example.PetCare.payment.service.google.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GoogleOAuthController {

    @Autowired
    private GoogleOAuthService googleOAuthService;

    @GetMapping("/google/authorize")
    public ResponseEntity<String> authorize() throws Exception {
        String authUrl = googleOAuthService.getAuthorizationUrl();
        return ResponseEntity.ok("Visit this URL to authorize:\n" + authUrl);
    }

    @GetMapping("/oauth2callback")
    public ResponseEntity<String> callback(@RequestParam("code") String code) throws Exception {
        googleOAuthService.exchangeCodeForTokens(code);
        return ResponseEntity.ok("✅ Authorization successful! You can close this tab. Meet links will now be generated automatically.");
    }
}