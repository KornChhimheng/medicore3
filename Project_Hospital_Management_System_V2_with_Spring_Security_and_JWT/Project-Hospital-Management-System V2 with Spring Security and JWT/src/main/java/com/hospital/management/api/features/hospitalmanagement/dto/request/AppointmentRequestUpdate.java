package com.hospital.management.api.features.hospitalmanagement.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentRequestUpdate {

    @NotNull(message = "Scheduled date and time is required")
    private LocalDateTime scheduledOn;
    @NotNull(message = "Doctor ID is required")
    private Long doctorId;

    @NotNull(message = "Patient ID is required")
    private Long patientId;
}
