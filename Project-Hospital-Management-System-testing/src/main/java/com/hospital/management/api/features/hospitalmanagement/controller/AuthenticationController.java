package com.hospital.management.api.features.hospitalmanagement.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.api.features.hospitalmanagement.dto.request.ChangePasswordRequest;
import com.hospital.management.api.features.hospitalmanagement.dto.request.LoginRequest;
import com.hospital.management.api.features.hospitalmanagement.dto.request.PatienRegister;
import com.hospital.management.api.features.hospitalmanagement.dto.request.RefreshTokenRequest;
import com.hospital.management.api.features.hospitalmanagement.dto.request.RolePermissionRequest;
import com.hospital.management.api.features.hospitalmanagement.dto.response.BaseResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.LoginResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.PatientRegisterResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.RefreshTokenResponse;
import com.hospital.management.api.features.hospitalmanagement.service.AuthenticationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
@RestController
public class AuthenticationController {
    private final AuthenticationService authenticationService; 
    @PostMapping("auth/patient-register")
    public ResponseEntity<PatientRegisterResponse> registerPatient(@Valid @RequestBody PatienRegister requestRegister){
        return ResponseEntity.ok(authenticationService.registerPatient(requestRegister));
    }
    @PostMapping("auth/login")
    public ResponseEntity<BaseResponse<LoginResponse>> login(@RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(authenticationService.login(loginRequest));
    }
    @PostMapping("auth/refresh-token")
    public ResponseEntity<RefreshTokenResponse> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest){
        return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }
    @PostMapping("api/add-permission")
    public ResponseEntity<?> addPermissionToRole(@RequestBody RolePermissionRequest request){
       authenticationService.addPermissionToRole(request);
        return ResponseEntity.ok("Success");
    }
    @PostMapping("api/remove-permission")
    public ResponseEntity<?> removePermissionToRole(@RequestBody RolePermissionRequest request){
        authenticationService.removePermissionFromRole(request);
        return ResponseEntity.ok("Success");
    }

    @PatchMapping("api/update-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Principal connectedUser) {
        authenticationService.changePassword(request, connectedUser);
        return ResponseEntity.ok("Success"); 
    }

}
