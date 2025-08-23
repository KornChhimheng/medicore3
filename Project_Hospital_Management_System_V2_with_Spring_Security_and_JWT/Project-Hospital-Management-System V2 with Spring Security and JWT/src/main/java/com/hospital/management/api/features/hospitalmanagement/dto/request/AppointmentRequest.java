package com.hospital.management.api.features.hospitalmanagement.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentRequest {

    @NotNull(message = "Scheduled date and time is required")
    @FutureOrPresent(message = "scheduledOn date must be in the present or future")
    private LocalDateTime scheduledOn;
    @NotNull(message = "Doctor ID is required")
    private Long doctorId;

    @NotNull(message = "Patient ID is required")
    private Long patientId;
}
/*
 {
  "scheduledOn": "2025-07-17 09:30:00",
  "date": "2025-07-17",
  "time": "09:30:00",
  "doctorId": 1,
  "patientId": 4
}

 */
