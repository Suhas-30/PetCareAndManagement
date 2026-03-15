package com.example.PetCare;

import com.example.PetCare.payment.service.google.config.GoogleMeetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.time.LocalDateTime;

@SpringBootApplication
public class PetCareApplication  {

    @Autowired
    private GoogleMeetService googleMeetService;

    public static void main(String[] args) {
        var ctx = SpringApplication.run(PetCareApplication.class, args);
        System.out.println("GoogleOAuthController registered: " +
                ctx.containsBean("googleOAuthController"));
    }


}
