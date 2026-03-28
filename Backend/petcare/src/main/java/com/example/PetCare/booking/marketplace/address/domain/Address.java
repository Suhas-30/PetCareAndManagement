package com.example.PetCare.booking.marketplace.address.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID userId;

    private String fullName;
    private String phone;

    private String line1;
    private String line2;

    private String city;
    private String state;
    private String pincode;

    private Boolean isDefault;
}