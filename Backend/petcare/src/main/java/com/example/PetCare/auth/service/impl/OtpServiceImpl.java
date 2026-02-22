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

    public OtpServiceImpl(EmailOtpRepository emailOtpRepository, NotificationService notificationService) {
        this.emailOtpRepository = emailOtpRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public void createAndSendOtp(User user) {
        this.emailOtpRepository.invalidateOldOtps(user.getId());
        String otp = this.generateOtp();
        EmailOtp emailOtp = new EmailOtp();
        emailOtp.setUser(user);
        emailOtp.setOtp(otp);
        emailOtp.setExpiryTime(LocalDateTime.now().plusMinutes(5L));
        emailOtp.setUsed(false);
        this.emailOtpRepository.save(emailOtp);
        this.notificationService.send(user.getEmail(), "Smart Pet Care - OTP Verification", "Your OTP is: " + otp);
    }

    public EmailOtp validateOtp(UUID userId, String otp) {
        EmailOtp emailOtp = (EmailOtp)this.emailOtpRepository.findByUser_IdAndOtpAndUsedFalse(userId, otp).orElseThrow(() -> new AppException("Invalid OTP"));
        if (emailOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new AppException("OTP expired");
        } else {
            emailOtp.setUsed(true);
            this.emailOtpRepository.save(emailOtp);
            return emailOtp;
        }
    }

    public String generateOtp() {
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
}