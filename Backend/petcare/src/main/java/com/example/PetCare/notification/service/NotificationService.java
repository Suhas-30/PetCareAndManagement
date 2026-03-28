package com.example.PetCare.notification.service;

public interface NotificationService {
    void send(String to, String subject, String message);
}