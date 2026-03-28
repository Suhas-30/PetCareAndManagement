package com.example.PetCare.booking.appointment.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Builder
public class MyAppointmentDto {

    private UUID id;

    private String doctorName;

    private LocalDate slotDate;
    private LocalTime startTime;
    private LocalTime endTime;

    private String mode;

    private String clinicAddressSnapshot;
    private String meetingLink;

    private String status;

    private String prescription; // later use
}