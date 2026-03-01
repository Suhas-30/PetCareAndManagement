package com.example.PetCare.schedule.service.impl;

import com.example.PetCare.schedule.dto.*;
import com.example.PetCare.schedule.domain.DoctorDaySchedule;
import com.example.PetCare.schedule.domain.DoctorDaySession;
import com.example.PetCare.schedule.enums.AvailabilityStatus;
import com.example.PetCare.schedule.repository.DoctorDayScheduleRepository;
import com.example.PetCare.schedule.repository.DoctorDaySessionRepository;
import com.example.PetCare.schedule.service.DoctorScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DoctorScheduleServiceImpl implements DoctorScheduleService {

    private final DoctorDayScheduleRepository dayScheduleRepository;
    private final DoctorDaySessionRepository sessionRepository;

    @Override
    @Transactional
    public void createDoctorSchedule(UUID doctorId,
                                     CreateDoctorScheduleRequest request) {

        Optional<DoctorDaySchedule> existing =
                dayScheduleRepository.findByDoctorIdAndDate(
                        doctorId,
                        request.getDate()
                );

        if (existing.isPresent()) {
            throw new RuntimeException("Schedule already exists for this date");
        }

        // Save day
        dayScheduleRepository.save(
                DoctorDaySchedule.builder()
                        .doctorId(doctorId)
                        .date(request.getDate())
                        .isWorking(request.getIsWorking())
                        .build()
        );

        if (!Boolean.TRUE.equals(request.getIsWorking())) return;

        List<DoctorSessionRequest> sessions = request.getSessions();

        if (sessions == null || sessions.isEmpty()) {
            throw new RuntimeException("Sessions required");
        }

        // sort
        sessions.sort(Comparator.comparing(DoctorSessionRequest::getStartTime));

        // validate overlap + 15 min gap
        for (int i = 0; i < sessions.size(); i++) {

            DoctorSessionRequest current = sessions.get(i);

            if (!current.getEndTime().isAfter(current.getStartTime())) {
                throw new RuntimeException("End must be after start");
            }

            if (i > 0) {
                DoctorSessionRequest previous = sessions.get(i - 1);

                LocalTime allowedStart =
                        previous.getEndTime().plusMinutes(15);

                if (current.getStartTime().isBefore(allowedStart)) {
                    throw new RuntimeException(
                            "15 minute gap required between sessions"
                    );
                }
            }
        }

        // save sessions
        List<DoctorDaySession> entities =
                sessions.stream()
                        .map(s -> DoctorDaySession.builder()
                                .doctorId(doctorId)
                                .date(request.getDate())
                                .startTime(s.getStartTime())
                                .endTime(s.getEndTime())
                                .status(AvailabilityStatus.AVAILABLE)
                                .build())
                        .toList();

        sessionRepository.saveAll(entities);
    }

    @Override
    public List<DoctorScheduleDateResponse> getConfiguredDates(
            UUID doctorId,
            LocalDate startDate,
            LocalDate endDate) {

        List<DoctorDaySchedule> schedules =
                dayScheduleRepository.findByDoctorIdAndDateBetween(
                        doctorId,
                        startDate,
                        endDate
                );

        return schedules.stream()
                .map(schedule ->
                        new DoctorScheduleDateResponse(
                                schedule.getDate(),
                                schedule.getIsWorking()
                        )
                )
                .toList();
    }

    @Override
    public DoctorDayScheduleResponse getScheduleByDate(UUID doctorId,
                                                       LocalDate date) {

        DoctorDaySchedule day =
                dayScheduleRepository.findByDoctorIdAndDate(doctorId, date)
                        .orElseThrow(() -> new RuntimeException("Not found"));

        List<DoctorDaySession> sessions =
                sessionRepository.findByDoctorIdAndDateOrderByStartTime(
                        doctorId, date);

        List<DoctorSessionResponse> response =
                sessions.stream()
                        .map(s -> new DoctorSessionResponse(
                                s.getStartTime(),
                                s.getEndTime(),
                                s.getStatus()
                        ))
                        .toList();

        return new DoctorDayScheduleResponse(
                day.getDate(),
                day.getIsWorking(),
                response
        );
    }
}