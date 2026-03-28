package com.example.PetCare.config;

import com.example.PetCare.user.domain.Role;
import com.example.PetCare.user.domain.User;
import com.example.PetCare.user.domain.UserStatus;
import com.example.PetCare.user.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void createAdmin() {
        String adminEmail = "smartpetcareorg@gmail.com";
        if (!this.userRepository.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setFullName("System Admin");
            admin.setEmail(adminEmail);
            admin.setPassword(this.passwordEncoder.encode("Admin@123"));
            admin.setRole(Role.ADMIN);
            admin.setEmailVerified(true);
            admin.setUserStatus(UserStatus.ACTIVE);
            this.userRepository.save(admin);
            System.out.println("Default admin created");
        }
    }
}
