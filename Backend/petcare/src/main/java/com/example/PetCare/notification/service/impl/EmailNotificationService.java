package com.example.PetCare.notification.service.impl;

import com.example.PetCare.notification.service.NotificationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationService implements NotificationService {

    @Value("${app.mail.from}")
    private String fromEmail;

    @Override
    public void send(String to, String subject, String message) {

        System.out.println("========== EMAIL MOCK ==========");
        System.out.println("FROM    : " + fromEmail);
        System.out.println("TO      : " + to);
        System.out.println("SUBJECT : " + subject);
        System.out.println("MESSAGE : " + message);
        System.out.println("================================");
    }
}
