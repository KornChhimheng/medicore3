package com.hospital.management.api.features.hospitalmanagement.service;

import java.security.Principal;

import com.hospital.management.api.features.hospitalmanagement.dto.request.ChangePasswordRequest;
import com.hospital.management.api.features.hospitalmanagement.dto.request.LoginRequest;
import com.hospital.management.api.features.hospitalmanagement.dto.request.PatienRegister;
import com.hospital.management.api.features.hospitalmanagement.dto.request.RefreshTokenRequest;
import com.hospital.management.api.features.hospitalmanagement.dto.request.RolePermissionRequest;
import com.hospital.management.api.features.hospitalmanagement.dto.response.BaseResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.LoginResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.PatientRegisterResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.RefreshTokenResponse;

public interface AuthenticationService {
   PatientRegisterResponse registerPatient(PatienRegister request);
   BaseResponse<LoginResponse> login(LoginRequest request);
   RefreshTokenResponse refreshToken(RefreshTokenRequest request);
   void addPermissionToRole(RolePermissionRequest request);
   void removePermissionFromRole(RolePermissionRequest request);
   void changePassword(ChangePasswordRequest request, Principal connectedUser);
}
