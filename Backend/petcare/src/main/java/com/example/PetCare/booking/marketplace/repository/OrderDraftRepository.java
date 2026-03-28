package com.example.PetCare.booking.marketplace.repository;

import com.example.PetCare.booking.marketplace.domain.OrderDraft;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderDraftRepository extends JpaRepository<OrderDraft, UUID> {
}