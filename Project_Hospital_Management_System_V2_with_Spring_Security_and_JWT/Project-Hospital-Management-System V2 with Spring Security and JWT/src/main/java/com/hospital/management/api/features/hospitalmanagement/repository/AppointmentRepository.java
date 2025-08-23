package com.hospital.management.api.features.hospitalmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.hospital.management.api.features.hospitalmanagement.entity.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long>, JpaSpecificationExecutor<Appointment> {
void deleteAllByPatient_PatientId(Long patientId);
void deleteAllByDoctor_DoctorId(Long patientId);

}