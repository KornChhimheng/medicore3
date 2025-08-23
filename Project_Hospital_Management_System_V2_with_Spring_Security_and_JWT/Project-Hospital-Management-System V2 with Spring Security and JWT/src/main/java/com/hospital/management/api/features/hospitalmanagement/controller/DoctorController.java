package com.hospital.management.api.features.hospitalmanagement.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.api.features.hospitalmanagement.dto.request.DoctorUpdate;
import com.hospital.management.api.features.hospitalmanagement.dto.response.BaseResponse;
import com.hospital.management.api.features.hospitalmanagement.service.DoctorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class DoctorController {
    private final DoctorService doctorService;

    @GetMapping("api/doctor/{id}")
    public ResponseEntity<?> getOnePatient(@PathVariable("id") Long doctorId) {
        return ResponseEntity.ok(doctorService.getOneDoctor(doctorId));
    }

    @DeleteMapping("api/doctor/{id}")
    public ResponseEntity<BaseResponse<Void>> deletePatient(@PathVariable("id") Long doctorId) {
        return ResponseEntity.ok(doctorService.deleteDoctor(doctorId));
    }

    @PutMapping("api/doctor/{id}")
    public ResponseEntity<BaseResponse<Void>> updateDoctor(@PathVariable("id") Long doctorId,
            @Valid @RequestBody DoctorUpdate request) {
        return ResponseEntity.ok(doctorService.updateDoctor(doctorId, request));
    }

    @GetMapping("api/doctor")
    public ResponseEntity<?> getDoctors(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(doctorService.searchDoctor(params));
    }
}
