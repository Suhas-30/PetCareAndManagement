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

    @Override
    public void send(String to, String subject, String message) {

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(fromEmail);
        mail.setTo(to);
        mail.setSubject(subject);
        mail.setText(message);

        mailSender.send(mail);
    }

    /* =====================================
       READY METHODS FOR YOUR USE CASES
    ===================================== */

    public void sendAppointmentBookedMail(String to, String doctorName, String date, String time) {

        String subject = "Appointment Confirmed";

        String message =
                "Your appointment has been successfully booked.\n\n" +
                        "Doctor: " + doctorName + "\n" +
                        "Date: " + date + "\n" +
                        "Time: " + time + "\n\n" +
                        "You can view full details inside the app.\n\n" +
                        "Thank you.";

        send(to, subject, message);
    }

    public void sendDoctorApprovedMail(String to, String doctorName) {

        String subject = "Doctor Application Approved";

        String message =
                "Congratulations Dr. " + doctorName + ",\n\n" +
                        "Your application has been approved successfully.\n" +
                        "You can now start accepting appointments.\n\n" +
                        "Best regards,\nPetCare Team";

        send(to, subject, message);
    }

    public void sendMeetingLinkMail(String to, String doctorName, String meetLink) {

        String subject = "Your Consultation Meeting Link";

        String message =
                "Your online consultation is scheduled.\n\n" +
                        "Doctor: " + doctorName + "\n\n" +
                        "Join using the link below:\n" +
                        meetLink + "\n\n" +
                        "Please join on time.\n\n" +
                        "PetCare Team";

        send(to, subject, message);
    }
}