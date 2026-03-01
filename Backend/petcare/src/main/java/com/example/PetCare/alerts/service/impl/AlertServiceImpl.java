package com.example.PetCare.alerts.service.impl;

import com.example.PetCare.alerts.dto.AlertDTO;
import com.example.PetCare.alerts.service.AlertService;
import com.example.PetCare.pets.health.domain.PetVaccination;
import com.example.PetCare.pets.health.repository.PetVaccinationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlertServiceImpl implements AlertService {

    private final PetVaccinationRepository vaccinationRepository;

    @Override
    public List<AlertDTO> getUserAlerts(String userEmail) {

        List<AlertDTO> alerts = new ArrayList<>();

        List<PetVaccination> vaccinations =
                vaccinationRepository.findByPetUserEmail(userEmail);

        LocalDate today = LocalDate.now();

        for (PetVaccination v : vaccinations) {

            if (v.getNextDueDate() == null) {
                continue;
            }

            long days =
                    ChronoUnit.DAYS.between(today, v.getNextDueDate());

            String message;

            /* -------- OVERDUE -------- */
            if (days < 0) {

                message = "overdue";

                alerts.add(new AlertDTO(
                        v.getId(),
                        "VACCINATION",
                        v.getPet().getName()
                                + " - "
                                + v.getVaccineName()
                                + " is " + message,
                        "/user/dashboard",
                        false,
                        LocalDateTime.now()
                ));

                continue;
            }

            /* -------- UPCOMING (within 30 days) -------- */
            if (days <= 30) {

                if (days == 0) {
                    message = "due today";
                } else if (days == 1) {
                    message = "due tomorrow";
                } else {
                    message = "due in " + days + " days";
                }

                alerts.add(new AlertDTO(
                        v.getId(),
                        "VACCINATION",
                        v.getPet().getName()
                                + " - "
                                + v.getVaccineName()
                                + " " + message,
                        "/user/dashboard",
                        false,
                        LocalDateTime.now()
                ));
            }
        }

        return alerts;
    }
}