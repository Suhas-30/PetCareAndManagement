package com.example.PetCare.doctor.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UpdateMeetingLinkRequest {

    private UUID appointmentId;
    private String meetingLink;

}