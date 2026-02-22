package com.example.PetCare.auth.repository;

import com.example.PetCare.auth.domain.EmailOtp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface EmailOtpRepository extends JpaRepository<EmailOtp, UUID> {
    Optional<EmailOtp> findByUser_IdAndOtpAndUsedFalse(UUID userId, String otp);

    @Modifying
    @Query("update EmailOtp e\nset e.used = true\nwhere e.user.id = :userId\nand e.used = false\n")
    void invalidateOldOtps(UUID userId);
}
