package com.example.PetCare.booking.appointment.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue
    private UUID id;

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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentStatus status;

    @Column(columnDefinition = "TEXT")
    private String purpose;

    @Column(nullable = false)
    private Integer consultingFee;

    @Column(columnDefinition = "TEXT")
    private String clinicAddressSnapshot;

    private LocalDateTime createdAt;

    private String meetingLink;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}