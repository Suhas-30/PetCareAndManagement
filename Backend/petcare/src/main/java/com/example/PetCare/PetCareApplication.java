package com.example.PetCare;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.time.LocalDateTime;

@SpringBootApplication
public class PetCareApplication  {


    public static void main(String[] args) {
        SpringApplication.run(PetCareApplication.class, args);

    }


}
