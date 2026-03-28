package com.example.PetCare.auth.service.impl;

import com.example.PetCare.auth.domain.EmailOtp;
import com.example.PetCare.auth.repository.EmailOtpRepository;
import com.example.PetCare.auth.service.OtpService;
import com.example.PetCare.common.exception.AppException;
import com.example.PetCare.notification.service.NotificationService;
import com.example.PetCare.user.domain.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class OtpServiceImpl implements OtpService {

    private static final SecureRandom random = new SecureRandom();

    private final EmailOtpRepository emailOtpRepository;
    private final NotificationService notificationService;

    public OtpServiceImpl(EmailOtpRepository emailOtpRepository,
                          NotificationService notificationService) {
        this.emailOtpRepository = emailOtpRepository;
        this.notificationService = notificationService;
    }

    /* ============================
       CREATE + SEND OTP
    ============================ */

    @Transactional
    public void createAndSendOtp(User user) {

        emailOtpRepository.invalidateOldOtps(user.getId());

        String otp = generateOtp();

        EmailOtp emailOtp = new EmailOtp();
        emailOtp.setUser(user);
        emailOtp.setOtp(otp);
        emailOtp.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        emailOtp.setUsed(false);

        emailOtpRepository.save(emailOtp);

        notificationService.send(
                user.getEmail(),
                "Smart Pet Care - OTP Verification",
                "Your OTP is: " + otp + "\n\nThis OTP will expire in 5 minutes."
        );
    }

    /* ============================
       VALIDATE OTP
    ============================ */

    public EmailOtp validateOtp(UUID userId, String otp) {

        EmailOtp emailOtp = emailOtpRepository
                .findByUser_IdAndOtpAndUsedFalse(userId, otp)
                .orElseThrow(() -> new AppException("Invalid OTP"));

        if (emailOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new AppException("OTP expired");
        }

        emailOtp.setUsed(true);
        emailOtpRepository.save(emailOtp);

        return emailOtp;
    }

    /* ============================
       GENERATE OTP
    ============================ */

    public String generateOtp() {
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
}