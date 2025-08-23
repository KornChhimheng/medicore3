package com.hospital.management.api.features.hospitalmanagement.service;

import com.hospital.management.api.features.hospitalmanagement.dto.request.AppointmentRequest;
import com.hospital.management.api.features.hospitalmanagement.dto.request.AppointmentRequestUpdate;
import com.hospital.management.api.features.hospitalmanagement.dto.response.AppointmentRespone;
import com.hospital.management.api.features.hospitalmanagement.dto.response.AppointmentResponeList;
import com.hospital.management.api.features.hospitalmanagement.dto.response.BaseResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.PaginatedResponse;

public interface AppointmentService {
 	BaseResponse<Void> createAppointment(AppointmentRequest request);
	BaseResponse<Void> updateAppointment(long apptId,AppointmentRequestUpdate request);
	BaseResponse<Void> deleteAppointment(long apptId);
	 BaseResponse<AppointmentRespone> getOneAppointment(long apptId);
	PaginatedResponse<AppointmentResponeList> searchAppointments( int page, int size,Long doctorId, String doctorName, String patientName,String sortBy,String sortDir);
	PaginatedResponse<AppointmentResponeList> specificationAppointments( int page, int size,Long doctorId, String doctorName, String patientName,String sortBy,String sortDir);

}