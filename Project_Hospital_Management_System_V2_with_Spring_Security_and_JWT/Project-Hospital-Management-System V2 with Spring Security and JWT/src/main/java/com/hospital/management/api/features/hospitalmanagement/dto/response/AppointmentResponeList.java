package com.hospital.management.api.features.hospitalmanagement.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentResponeList {
    private Long apptId;
    private LocalDateTime scheduledOn;
    private LocalDate date;
    private String time;
    private Long doctorId;
    private String doctor;
    private Long patientId;
    private String patient;
    public AppointmentResponeList(Long apptId, LocalDateTime scheduledOn, LocalDate date,
                              String time, Long doctorId, String doctorFullName,
                              Long patientId, String patientFullName) {
        this.apptId = apptId;
        this.scheduledOn = scheduledOn;
        this.date = date;
        this.time = time;
        this.doctorId = doctorId;
        this.doctor = doctorFullName;
        this.patientId = patientId;
        this.patient = patientFullName;
    }
}