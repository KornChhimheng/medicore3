package com.hospital.management.api.features.hospitalmanagement.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "doctors")
public class Doctor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "First name is required")
	private String firstName;

	@NotBlank(message = "Last name is required")
	private String lastName;

	@Column(name = "user_id", nullable = false)
	private Long userId;

	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	@Column(unique = true)
	private String email;

	@Column(unique = true)
    private String contactNumber;

	@NotBlank(message = "Gender is required")
	private String gender;

	@NotNull(message = "Date of birth is required")
	private LocalDate dateOfBirth;

	@NotBlank(message = "City is required")
	private String city;

	@NotBlank(message = "Country is required")
	private String country;

	@NotBlank(message = "Password is required")
	@Size(min = 8, message = "Password must be at least 8 characters long")
	private String password;

	@NotNull(message = "Joining date is required")
	private LocalDateTime joiningDate;

	@NotBlank(message = "Specialization is required")
	private String specialization;

	@NotBlank(message = "Blood group is required")
	private String bloodGroup;
        @PrePersist
    protected void onCreate() {
        joiningDate = LocalDateTime.now();
    }

}