package com.hospital.management.api.features.hospitalmanagement.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.hospital.management.api.features.hospitalmanagement.enums.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "doctors")
public class Doctor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long doctorId;

	@NotBlank(message = "First name is required")
	private String firstName;

	@NotBlank(message = "Last name is required")
	private String lastName;

	@Column(name = "user_id", nullable = false)
	private Long userId;
	
	@Column(unique = true)
    private String contactNumber;

    @Enumerated(EnumType.STRING)
    private Gender gender;

	@NotNull(message = "Date of birth is required")
	private LocalDate dateOfBirth;

	@NotBlank(message = "City is required")
	private String city;

	@NotBlank(message = "Country is required")
	private String country;

	@NotBlank(message = "Specialization is required")
	private String specialization;

	@NotBlank(message = "Blood group is required")
	private String bloodGroup;

	@Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
     @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}