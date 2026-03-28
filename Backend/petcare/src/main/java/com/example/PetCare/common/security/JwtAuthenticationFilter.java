package com.example.PetCare.common.security;

import com.example.PetCare.user.domain.User;
import com.example.PetCare.user.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserRepository userRepository
    ) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        System.out.println("JWT FILTER EXECUTED");
        System.out.println("URI = " + request.getRequestURI());

        String authHeader = request.getHeader("Authorization");

        // ✅ No token → continue
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        try {

            String email = jwtService.extractEmail(token);

            if (jwtService.isTokenValid(token, email)
                    && SecurityContextHolder.getContext().getAuthentication() == null) {

                // ==============================
                // LOAD USER FROM DATABASE
                // ==============================
                User user = userRepository.findByEmail(email)
                        .orElseThrow();

                String dbRole = user.getRole().name();
                String tokenRole = jwtService.extractRole(token);

                // ==============================
                // ⭐ ROLE CHANGE DETECTION
                // ==============================
                if (!dbRole.equals(tokenRole)) {

                    System.out.println("ROLE CHANGED → issuing new token");

                    String newToken = jwtService.generateToken(
                            user.getId(),
                            user.getEmail(),
                            user.getRole()
                    );

                    // send refreshed token to frontend
                    response.setHeader("X-NEW-TOKEN", newToken);
                }

                // ==============================
                // AUTHENTICATION
                // ==============================
                UserPrincipal principal =
                        new UserPrincipal(
                                user.getId(),
                                user.getEmail(),
                                user.getPassword(),
                                List.of(new SimpleGrantedAuthority("ROLE_" + dbRole))
                        );

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                principal,
                                null,
                                principal.getAuthorities()
                        );

                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

        } catch (Exception e) {
            System.out.println("JWT ERROR: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    // prevent duplicate execution on error dispatch
    @Override
    protected boolean shouldNotFilterErrorDispatch() {
        return true;
    }
}