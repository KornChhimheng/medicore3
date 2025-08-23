package com.hospital.management.api.features.hospitalmanagement.dto.response;

import java.time.LocalDate;

import com.hospital.management.api.features.hospitalmanagement.enums.Gender;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorResponse {

    private Long doctorId;

    private String firstName;

    private String lastName;

    private String contactNumber;

    private Gender gender;

    private LocalDate dateOfBirth;

    private String city;

    private String country;

    private String specialization;

    private String bloodGroup;
}
