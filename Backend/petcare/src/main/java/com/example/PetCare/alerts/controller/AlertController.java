package com.example.PetCare.alerts.controller;

import com.example.PetCare.alerts.dto.AlertDTO;
import com.example.PetCare.alerts.service.AlertService;

import com.example.PetCare.common.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alerts")
@RequiredArgsConstructor
public class AlertController {

    private final AlertService alertService;

    /* -------- GET USER ALERTS -------- */

    @GetMapping
    public ResponseEntity<List<AlertDTO>> getUserAlerts(
            @AuthenticationPrincipal UserPrincipal user
    ) {

        return ResponseEntity.ok(
                alertService.getUserAlerts(user.getEmail())
        );
    }
}