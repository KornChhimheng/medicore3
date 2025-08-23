package com.hospital.management.api.features.hospitalmanagement.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class AppointmentRespone {
    private Long apptId;
    private LocalDateTime scheduledOn;
    private Long doctorId;
    private Long patientId;
     public AppointmentRespone() {
    }
    public AppointmentRespone(Long apptId, LocalDateTime scheduledOn, Long doctorId, Long patientId) {
        this.apptId = apptId;
        this.scheduledOn = scheduledOn;
        this.doctorId = doctorId;
        this.patientId = patientId;
    }


}
