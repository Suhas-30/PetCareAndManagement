package com.example.PetCare.booking.appointment.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "appointment_drafts")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDraft {

    @Id
    private UUID id; // 👉 SAME as payment contextId

    @Column(nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private UUID doctorId;

    @Column(nullable = false)
    private UUID slotId;

    @Column(nullable = false)
    private UUID petId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentMode mode;

    @Column(columnDefinition = "TEXT")
    private String purpose;

    @Column(nullable = false)
    private Integer consultingFee;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}