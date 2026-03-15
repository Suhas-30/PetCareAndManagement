package com.example.PetCare.notification.service.impl;

import com.example.PetCare.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailNotificationService implements NotificationService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromEmail;

    @Value("${spring.mail.password}")
    private String mailPassword;   // 👈 add this

    @Override
    public void send(String to, String subject, String message) {

        System.out.println("MAIL PASSWORD USED = " + mailPassword);  // 👈 debug

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(fromEmail);
        mail.setTo(to);
        mail.setSubject(subject);
        mail.setText(message);

        mailSender.send(mail);
    }
}