package com.example.PetCare.booking.appointment.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.UUID;

@Getter
@Builder
public class SlotResponseDTO {

    private UUID id;
    private LocalTime startTime;
    private LocalTime endTime;
    private BigDecimal consultingFee;
    private DoctorInfo doctor;
    private String mode;

    @Getter
    @Builder
    public static class DoctorInfo {

        private String consultationType;
        private String address1;
        private String address2;
        private String area;
        private String city;
    }
}