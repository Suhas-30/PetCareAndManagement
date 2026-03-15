package com.example.PetCare.payment.repository;

import com.example.PetCare.payment.domain.Payment;
import com.example.PetCare.payment.domain.PaymentContextType;
import com.example.PetCare.payment.domain.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);
}