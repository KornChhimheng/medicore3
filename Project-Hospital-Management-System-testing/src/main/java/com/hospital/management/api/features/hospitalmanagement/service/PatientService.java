package com.hospital.management.api.features.hospitalmanagement.service;

import com.hospital.management.api.core.daos.respone.ApiResponse;
import com.hospital.management.api.features.hospitalmanagement.entity.Patient;

public interface PatientService {
    Patient create(Patient patient);
	ApiResponse<Patient> getById(Long id) throws Exception;

}
