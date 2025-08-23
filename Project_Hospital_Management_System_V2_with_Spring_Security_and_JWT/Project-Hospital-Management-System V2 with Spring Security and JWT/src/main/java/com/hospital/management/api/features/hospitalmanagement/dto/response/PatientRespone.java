package com.hospital.management.api.features.hospitalmanagement.dto.response;

import java.time.LocalDate;

import com.hospital.management.api.features.hospitalmanagement.enums.Gender;
import com.hospital.management.api.features.hospitalmanagement.enums.Status;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class PatientRespone {

    private Long patientId;
    
    private String firstName;

    private String lastName;

    private LocalDate dateOfBirth;

    private Gender gender;

    private String contactNumber;

    private String city;

    private String country;

    private String bloodGroup;

    private String allergies;

    private Status status;
}
