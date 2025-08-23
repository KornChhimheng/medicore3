package com.hospital.management.api.features.hospitalmanagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.api.features.hospitalmanagement.dto.request.AppointmentRequest;
import com.hospital.management.api.features.hospitalmanagement.dto.request.AppointmentRequestUpdate;
import com.hospital.management.api.features.hospitalmanagement.dto.response.AppointmentResponeList;
import com.hospital.management.api.features.hospitalmanagement.dto.response.BaseResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.PaginatedResponse;
import com.hospital.management.api.features.hospitalmanagement.service.AppointmentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class AppointmentController {
    private final AppointmentService appointmentService;

    @PostMapping("api/appointment")
    public ResponseEntity<BaseResponse<Void>> createAppointment(@Valid @RequestBody AppointmentRequest request) {
        return ResponseEntity.ok(appointmentService.createAppointment(request));
    }
    @PutMapping("api/appointment/{id}")
    public ResponseEntity<BaseResponse<Void>> updateAppointment(@PathVariable("id") Long apptId ,@Valid @RequestBody AppointmentRequestUpdate request) {
        return ResponseEntity.ok(appointmentService.updateAppointment(apptId,request));
    }
    @DeleteMapping("api/appointment/{id}")
    public ResponseEntity<BaseResponse<Void>> deleteAppointment(@PathVariable(name = "id") Long apptId) {
        return ResponseEntity.ok(appointmentService.deleteAppointment(apptId));
    }
    @GetMapping("api/appointment/{id}")
	public ResponseEntity<?> getOneAppointment(@PathVariable("id") Long apptId){
		return ResponseEntity.ok(appointmentService.getOneAppointment(apptId));
	}
    @GetMapping("api/appointment")
    public ResponseEntity<PaginatedResponse<AppointmentResponeList>> searchAppointments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Long doctorId,
            @RequestParam(defaultValue = "") String doctorName,
            @RequestParam(defaultValue = "") String patientName,
            @RequestParam(defaultValue = "scheduledOn") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        return ResponseEntity.ok(appointmentService.searchAppointments(page, size, doctorId, doctorName, patientName, sortBy, sortDir));
    }
    @GetMapping("api/v2/appointment")
    public ResponseEntity<PaginatedResponse<AppointmentResponeList>> getAppointments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Long doctorId,
            @RequestParam(defaultValue = "") String doctorName,
            @RequestParam(defaultValue = "") String patientName,
            @RequestParam(defaultValue = "scheduledOn") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        return ResponseEntity.ok(appointmentService.specificationAppointments(page, size, doctorId, doctorName, patientName, sortBy, sortDir));
    }

}
