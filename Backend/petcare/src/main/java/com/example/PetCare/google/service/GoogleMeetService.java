package com.example.PetCare.google.service;

import java.time.LocalDateTime;

public interface GoogleMeetService {

    String createMeet(String doctorEmail,
                      String userEmail,
                      LocalDateTime startTime);

}