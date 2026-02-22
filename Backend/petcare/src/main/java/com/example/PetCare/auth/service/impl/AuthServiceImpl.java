package com.example.PetCare.auth.service.impl;

import com.example.PetCare.auth.domain.EmailOtp;
import com.example.PetCare.auth.dto.LoginRequest;
import com.example.PetCare.auth.dto.LoginResponse;
import com.example.PetCare.auth.dto.RegisterRequest;
import com.example.PetCare.auth.repository.EmailOtpRepository;
import com.example.PetCare.auth.service.AuthService;
import com.example.PetCare.auth.service.OtpService;
import com.example.PetCare.common.exception.AppException;
import com.example.PetCare.common.security.JwtService;
import com.example.PetCare.notification.service.NotificationService;
import com.example.PetCare.user.domain.User;
import com.example.PetCare.user.domain.UserStatus;
import com.example.PetCare.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final EmailOtpRepository emailOtpRepository;
    private final OtpService otpService;
    private final NotificationService notificationService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthServiceImpl(UserRepository userRepository,
                           EmailOtpRepository emailOtpRepository,
                           OtpService otpService,
                           NotificationService notificationService,
                           PasswordEncoder passwordEncoder,
                           JwtService jwtService) {
        this.userRepository = userRepository;
        this.emailOtpRepository = emailOtpRepository;
        this.otpService = otpService;
        this.notificationService = notificationService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException("Email already registered");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUserStatus(UserStatus.PENDING);

        userRepository.save(user);

        System.out.println("UUID is : " + user.getId());

        otpService.createAndSendOtp(user);

        return user;
    }

    @Override
    public String verifyOtp(UUID userId, String otp) {

        EmailOtp emailOtp = otpService.validateOtp(userId, otp);

        User user = emailOtp.getUser();
        user.setUserStatus(UserStatus.ACTIVE);
        user.setEmailVerified(true);

        userRepository.save(user);

        return "Account Verified successfully";
    }

    @Override
    public String resendOtp(UUID userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException("User not found"));

        if (user.isEmailVerified()) {
            throw new AppException("Account already verified");
        }

        otpService.createAndSendOtp(user);

        return "OTP resent successfully";
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException("Invalid credentials"));

        if (!user.isEmailVerified()) {
            throw new AppException("Please verify your email first");
        }

        if (user.getUserStatus() != UserStatus.ACTIVE) {
            throw new AppException("Account is not active");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AppException("Invalid credentials");
        }

        String token = jwtService.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole()
        );

        System.out.println(token);

        return new LoginResponse(token, user.getRole());
    }
}