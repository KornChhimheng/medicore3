package com.hospital.management.api.features.hospitalmanagement.dto.response;

import java.time.LocalDateTime;

import com.hospital.management.api.features.hospitalmanagement.enums.Gender;
import com.hospital.management.api.features.hospitalmanagement.enums.Status;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientResponeList {

    private Long patientId;

    private String fullName;

    private Gender gender;

    private String contactNumber;

    private String country;

    private String bloodGroup;

    private String allergies;
    private Status status;
    private LocalDateTime createdAt;

    public PatientResponeList(Long patientId, String fullName, Gender gender, String contactNumber, String country,
            String bloodGroup, String allergies, Status status, LocalDateTime createdAt) {
        this.patientId = patientId;
        this.fullName = fullName;
        this.gender = gender;
        this.contactNumber = contactNumber;
        this.country = country;
        this.bloodGroup = bloodGroup;
        this.allergies = allergies;
        this.status = status;
        this.createdAt = createdAt;
    }
}
