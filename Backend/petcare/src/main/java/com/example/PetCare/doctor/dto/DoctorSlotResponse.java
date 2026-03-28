package com.example.PetCare.doctor.dto;

import com.example.PetCare.doctor.domain.DoctorSlot;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Builder
public class DoctorSlotResponse {

    private UUID id;
    private LocalDate slotDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String status;
    private BigDecimal consultingFee;

    public static DoctorSlotResponse fromEntity(DoctorSlot slot) {
        return DoctorSlotResponse.builder()
                .id(slot.getId())
                .slotDate(slot.getSlotDate())
                .startTime(slot.getStartTime())
                .endTime(slot.getEndTime())
                .status(slot.getStatus().name())
                .consultingFee(slot.getConsultingFee())
                .build();
    }
}