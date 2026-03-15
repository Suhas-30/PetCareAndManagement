package com.example.PetCare.doctor.service;

import com.example.PetCare.doctor.dto.PrescriptionResponse;
import com.example.PetCare.doctor.dto.SavePrescriptionRequest;
import com.example.PetCare.doctor.dto.UpcomingAppointmentDto;

import java.util.List;
import java.util.UUID;

public interface DoctorDashboardService {

    List<UpcomingAppointmentDto> getUpcomingAppointments(UUID doctorUserId);
    PrescriptionResponse saveOrUpdatePrescription(UUID doctorUserId, SavePrescriptionRequest request);

    PrescriptionResponse getPrescription(UUID appointmentId);

}