package com.hospital.management.api.features.hospitalmanagement.dto.request;

import java.time.LocalDate;

import com.hospital.management.api.features.hospitalmanagement.dto.request.validator.contactnumber.UniqueContactNumber;
import com.hospital.management.api.features.hospitalmanagement.dto.request.validator.email.UniqueEmail;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotEmpty
    @Email
    @UniqueEmail(message = "Email already has!")
    @Column(unique = true)
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    //@Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\d{9,15}$", message = "ContactNumber contact number")
    @UniqueContactNumber
    @Column(unique = true)
    private String contactNumber;


    @NotBlank(message = "Gender is required")
    private String gender;


    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Country is required")
    private String country;

    @NotNull(message = "Joining date is required")
    private LocalDate joiningDate;

    @NotBlank(message = "Specialization is required")
    private String specialization;

    @NotBlank(message = "Blood group is required")
    private String bloodGroup;
}