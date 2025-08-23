package com.hospital.management.api.features.hospitalmanagement.dto.request;

import java.time.LocalDate;

import com.hospital.management.api.features.hospitalmanagement.dto.request.validator.contactnumber.UniqueContactNumber;
import com.hospital.management.api.features.hospitalmanagement.dto.request.validator.email.UniqueEmail;
import com.hospital.management.api.features.hospitalmanagement.enums.Gender;
import com.hospital.management.api.features.hospitalmanagement.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatienRegister {

    @NotEmpty
    @Email
    @UniqueEmail(message = "Email already exists!")
    @Column(unique = true)
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    //@Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    private Gender gender; 
 
    @NotBlank(message = "contactNumber is required")
    @Pattern(regexp = "^\\d{9,15}$", message = "contactNumber only contain number")
    @UniqueContactNumber(message = "contactNumber already exists!")
    @Column(unique = true)
    private String contactNumber;

    private String city;

    private String country;

    private String bloodGroup;

    private String allergies;

    private Status status;
}
