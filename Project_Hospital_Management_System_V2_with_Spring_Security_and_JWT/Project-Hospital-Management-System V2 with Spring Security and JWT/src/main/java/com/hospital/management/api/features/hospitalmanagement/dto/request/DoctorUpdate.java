package com.hospital.management.api.features.hospitalmanagement.dto.request;

import java.time.LocalDate;

import com.hospital.management.api.features.hospitalmanagement.dto.request.validator.contactnumber.UniqueContactNumber;
import com.hospital.management.api.features.hospitalmanagement.enums.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class DoctorUpdate {
    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\d{9,15}$", message = "ContactNumber must 9-15 digit number")
    @UniqueContactNumber
    @Column(unique = true)
    private String contactNumber;

    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Country is required")
    private String country;

    @NotBlank(message = "Specialization is required")
    private String specialization;

    @NotBlank(message = "Blood group is required")
    private String bloodGroup;
}
