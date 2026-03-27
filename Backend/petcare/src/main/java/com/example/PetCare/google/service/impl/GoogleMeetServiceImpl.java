package com.example.PetCare.google.service.impl;

import com.example.PetCare.google.service.GoogleMeetService;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GoogleMeetServiceImpl implements GoogleMeetService {

    private final Calendar calendar;

    @Override
    public String createMeet(String doctorEmail,
                             String userEmail,
                             LocalDateTime startTime) {

        try {

            /* ===========================
               CREATE EVENT
            =========================== */

            Event event = new Event()
                    .setSummary("PetCare Appointment")
                    .setDescription("Online consultation");

            ZoneId zoneId = ZoneId.systemDefault();

            DateTime start = new DateTime(
                    startTime.atZone(zoneId).toInstant().toEpochMilli());

            DateTime end = new DateTime(
                    startTime.plusMinutes(30).atZone(zoneId).toInstant().toEpochMilli());

            event.setStart(new EventDateTime().setDateTime(start));
            event.setEnd(new EventDateTime().setDateTime(end));

            /* ===========================
               CREATE MEET REQUEST
            =========================== */

            ConferenceData confData = new ConferenceData();

            CreateConferenceRequest createConferenceRequest = new CreateConferenceRequest()
                    .setRequestId(UUID.randomUUID().toString());

            confData.setCreateRequest(createConferenceRequest);
            event.setConferenceData(confData);

            /* ===========================
               CREATE EVENT IN CALENDAR
            =========================== */

            Event createdEvent = calendar.events()
                    .insert("primary", event)
                    .setConferenceDataVersion(1)
                    .execute();

            /* ===========================
               EXTRACT MEET LINK
            =========================== */

            ConferenceData createdConfData = createdEvent.getConferenceData();

            if (createdConfData != null && createdConfData.getEntryPoints() != null) {

                for (EntryPoint entryPoint : createdConfData.getEntryPoints()) {

                    if ("video".equals(entryPoint.getEntryPointType())) {
                        return entryPoint.getUri();
                    }

                }
            }

            return null;

        } catch (Exception e) {
            e.printStackTrace(); // keep for debug
            throw new RuntimeException("Failed to create Google Meet", e);
        }
    }
}