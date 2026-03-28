package com.example.PetCare.doctor.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "doctor_slots",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = {"doctor_id", "slot_date", "start_time"})
       })
@Getter
@Setter
public class DoctorSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Version
    @Column(nullable = false)
    private Long version = 0L;


    // ---------------- DOCTOR ----------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private DoctorApplication doctor;

    // ---------------- SLOT INFO ----------------
    @Column(name = "slot_date", nullable = false)
    private LocalDate slotDate;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(nullable = false)
    private BigDecimal consultingFee;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SlotStatus status;

    @Column(nullable = false)
    private LocalDateTime createdAt;



    // ---------------- DEFAULTS ----------------
    public DoctorSlot() {
        this.status = SlotStatus.AVAILABLE;
        this.createdAt = LocalDateTime.now();
    }

    // ---------------- DOMAIN METHODS ----------------

    public void markBooked() {
        if (this.status != SlotStatus.AVAILABLE) {
            throw new IllegalStateException("Slot is not available for booking.");
        }
        this.status = SlotStatus.BOOKED;
    }

    public void cancelByDoctor() {
        if (this.status == SlotStatus.BOOKED) {
            throw new IllegalStateException("Booked slot cannot be cancelled by doctor.");
        }
        this.status = SlotStatus.CANCELLED;
    }

    public void cancelBySystem() {
        this.status = SlotStatus.CANCELLED;
    }


}