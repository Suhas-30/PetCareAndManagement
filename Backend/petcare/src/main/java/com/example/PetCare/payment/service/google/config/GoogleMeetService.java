package com.example.PetCare.payment.service.google.config;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.ConferenceData;
import com.google.api.services.calendar.model.ConferenceSolutionKey;
import com.google.api.services.calendar.model.CreateConferenceRequest;
import com.google.api.services.calendar.model.EntryPoint;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;

@Service
public class GoogleMeetService {

    @Autowired
    private GoogleOAuthService googleOAuthService;

    public String generateMeetLink(String title,
                                   LocalDateTime startTime,
                                   LocalDateTime endTime) throws Exception {

        Credential credential = googleOAuthService.loadCredential();

        if (credential == null) {
            throw new IllegalStateException(
                    "Not authorized yet. Visit http://localhost:8080/oauth2/authorize first."
            );
        }

        Calendar calendarClient = new Calendar.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                credential)
                .setApplicationName("PetCare")
                .build();

        Event event = new Event()
                .setSummary(title)
                .setStart(new EventDateTime()
                        .setDateTime(toGoogleDateTime(startTime))
                        .setTimeZone("Asia/Kolkata"))
                .setEnd(new EventDateTime()
                        .setDateTime(toGoogleDateTime(endTime))
                        .setTimeZone("Asia/Kolkata"))
                .setConferenceData(new ConferenceData()
                        .setCreateRequest(new CreateConferenceRequest()
                                .setRequestId(UUID.randomUUID().toString())
                                .setConferenceSolutionKey(
                                        new ConferenceSolutionKey().setType("hangoutsMeet")
                                )));

        Event createdEvent = calendarClient.events()
                .insert("primary", event)
                .setConferenceDataVersion(1)
                .execute();

        return createdEvent.getConferenceData()
                .getEntryPoints()
                .stream()
                .filter(ep -> "video".equals(ep.getEntryPointType()))
                .map(EntryPoint::getUri)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Meet link not generated"));
    }

    private DateTime toGoogleDateTime(LocalDateTime localDateTime) {
        return new DateTime(
                Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant())
        );
    }
}