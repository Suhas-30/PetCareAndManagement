package com.example.PetCare.alerts.service;

import com.example.PetCare.alerts.dto.AlertDTO;

import java.util.List;

public interface AlertService {

    List<AlertDTO> getUserAlerts(String userEmail);
}