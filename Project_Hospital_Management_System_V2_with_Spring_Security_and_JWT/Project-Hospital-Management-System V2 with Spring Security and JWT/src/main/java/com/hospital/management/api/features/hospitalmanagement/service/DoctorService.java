package com.hospital.management.api.features.hospitalmanagement.service;

import java.util.Map;

import com.hospital.management.api.features.hospitalmanagement.dto.request.DoctorUpdate;
import com.hospital.management.api.features.hospitalmanagement.dto.response.BaseResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.DoctorResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.DoctorResponseList;
import com.hospital.management.api.features.hospitalmanagement.dto.response.PaginatedResponse;

public interface DoctorService {

    BaseResponse<DoctorResponse> getOneDoctor(Long doctorId);
    BaseResponse<Void> deleteDoctor(long doctorId);
    BaseResponse<Void> updateDoctor(long doctorId,DoctorUpdate request);
	PaginatedResponse<DoctorResponseList> searchDoctor(Map<String, String> params);
}
