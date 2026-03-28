package com.example.PetCare.google.service.impl;

import com.example.PetCare.common.exception.AppException;
import com.example.PetCare.common.security.JwtService;
import com.example.PetCare.google.service.GoogleOAuthService;
import com.example.PetCare.user.domain.Role;
import com.example.PetCare.user.domain.User;
import com.example.PetCare.user.domain.UserStatus;
import com.example.PetCare.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class GoogleOAuthServiceImpl implements GoogleOAuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Value("${google.oauth.client-id}")
    private String clientId;

    @Value("${google.oauth.client-secret}")
    private String clientSecret;

    @Value("${google.oauth.redirect-uri}")
    private String redirectUri;

    @Override
    public Object authenticate(String code) {

        RestTemplate restTemplate = new RestTemplate();

        /* ===============================
           STEP 1 — Exchange Code → Token
        =============================== */

        String tokenUrl = "https://oauth2.googleapis.com/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", code);
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("redirect_uri", redirectUri);
        body.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<Map> response =
                restTemplate.postForEntity(tokenUrl, request, Map.class);

        Map tokenResponse = response.getBody();

        if (tokenResponse == null || tokenResponse.get("access_token") == null) {
            throw new AppException("Failed to get access token from Google");
        }

        String accessToken = (String) tokenResponse.get("access_token");

        /* ===============================
           STEP 2 — Get User Info
        =============================== */

        String userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";

        HttpHeaders userHeaders = new HttpHeaders();
        userHeaders.setBearerAuth(accessToken);

        HttpEntity<String> userRequest = new HttpEntity<>(userHeaders);

        ResponseEntity<Map> userResponse =
                restTemplate.exchange(userInfoUrl, HttpMethod.GET, userRequest, Map.class);

        Map userInfo = userResponse.getBody();

        if (userInfo == null) {
            throw new AppException("Failed to fetch Google user info");
        }

        String email = (String) userInfo.get("email");
        String name = (String) userInfo.get("name");

        /* ===============================
           STEP 3 — DB Logic
        =============================== */

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setFullName(name);
            user.setUserStatus(UserStatus.ACTIVE);
            user.setRole(Role.USER);
            userRepository.save(user);
        }

        String token = jwtService.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole()
        );

        return Map.of(
                "token", token,
                "role", user.getRole(),
                "email", user.getEmail()
        ); // next step → JWT
    }
}