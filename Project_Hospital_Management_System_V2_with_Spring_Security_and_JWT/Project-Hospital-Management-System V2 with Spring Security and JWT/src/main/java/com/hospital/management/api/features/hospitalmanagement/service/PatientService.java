package com.hospital.management.api.features.hospitalmanagement.service;

import java.util.Map;

import com.hospital.management.api.features.hospitalmanagement.dto.request.PatienUpdate;
import com.hospital.management.api.features.hospitalmanagement.dto.response.BaseResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.PaginatedResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.PatientRespone;
import com.hospital.management.api.features.hospitalmanagement.dto.response.PatientResponeList;

public interface PatientService {
    BaseResponse<PatientRespone> getOnePatient(Long patientId);
    BaseResponse<Void> updatePatient(long patientId,PatienUpdate request);
    BaseResponse<Void> deletePatient(long patientId);
	PaginatedResponse<PatientResponeList> searchPatient(Map<String, String> params);


}

