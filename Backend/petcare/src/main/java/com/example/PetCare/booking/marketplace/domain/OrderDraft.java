package com.example.PetCare.booking.marketplace.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "order_drafts")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDraft {

    @Id
    private UUID id; // 👉 SAME as payment contextId

    private UUID userId;

    private UUID addressId;

    @Column(columnDefinition = "TEXT")
    private String itemsJson; // 👉 store productIds + qty (json)

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}