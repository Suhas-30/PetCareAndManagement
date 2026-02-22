package com.example.PetCare.common.security;

import com.example.PetCare.user.domain.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.security.Key;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.expiration}")
    private long jwtExpiration;

    public String extractRole(String token) {
        return (String)((Claims)Jwts.parserBuilder().setSigningKey(this.getSignKey()).build().parseClaimsJws(token).getBody()).get("role", String.class);
    }

    private Key getSignKey() {
        if (this.secretKey != null && !this.secretKey.isBlank()) {
            byte[] keyBytes = this.secretKey.getBytes();
            return Keys.hmacShaKeyFor(keyBytes);
        } else {
            throw new RuntimeException("JWT secret key not loaded");
        }
    }

    public String generateToken(UUID userId, String email, Role role) {
        return Jwts.builder().setSubject(email).claim("userId", userId.toString()).claim("role", role.name()).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + this.jwtExpiration)).signWith(this.getSignKey(), SignatureAlgorithm.HS256).compact();
    }

    public String extractEmail(String token) {
        return ((Claims)Jwts.parserBuilder().setSigningKey(this.getSignKey()).build().parseClaimsJws(token).getBody()).getSubject();
    }

    private boolean isTokenExipred(String token) {
        Date exipration = ((Claims)Jwts.parserBuilder().setSigningKey(this.getSignKey()).build().parseClaimsJws(token).getBody()).getExpiration();
        return exipration.before(new Date());
    }

    public boolean isTokenVaild(String token, String email) {
        String extractedEmail = this.extractEmail(token);
        return extractedEmail.equals(email) && !this.isTokenExipred(token);
    }
}
