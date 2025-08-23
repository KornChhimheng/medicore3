package com.hospital.management.api.features.hospitalmanagement.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class DoctorResponseList {
    private Long doctorId;

    private String fullName;

    private String contactNumber;

    private String country;

    private String specialization;

    private LocalDateTime createdAt;


    public DoctorResponseList(Long doctorId, String fullName, String contactNumber, String country,
            String specialization,LocalDateTime createdAt) {
        this.doctorId = doctorId;
        this.fullName = fullName;
        this.contactNumber = contactNumber;
        this.country = country;
        this.specialization = specialization;
        this.createdAt = createdAt;

    }
}
