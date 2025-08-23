package com.hospital.management.api.features.hospitalmanagement.service.impl;

import java.security.Principal;
import java.util.Date;
import java.util.HashMap;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hospital.management.api.core.exceptions.CustomAuthenticationException;
import com.hospital.management.api.core.exceptions.ResourceNotFoundException;
import com.hospital.management.api.core.security.CustomUserDetail;
import com.hospital.management.api.core.security.JwtTokenUtil;
import com.hospital.management.api.core.security.OurUserDetailsService;
import com.hospital.management.api.core.utils.GlobalConstant;
import com.hospital.management.api.features.hospitalmanagement.dto.request.ChangePasswordRequest;
import com.hospital.management.api.features.hospitalmanagement.dto.request.LoginRequest;
import com.hospital.management.api.features.hospitalmanagement.dto.request.PatienRegister;
import com.hospital.management.api.features.hospitalmanagement.dto.request.RefreshTokenRequest;
import com.hospital.management.api.features.hospitalmanagement.dto.request.RolePermissionRequest;
import com.hospital.management.api.features.hospitalmanagement.dto.response.BaseResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.LoginResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.PatientRegisterResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.RefreshTokenResponse;
import com.hospital.management.api.features.hospitalmanagement.entity.Patient;
import com.hospital.management.api.features.hospitalmanagement.entity.Permission;
import com.hospital.management.api.features.hospitalmanagement.entity.Role;
import com.hospital.management.api.features.hospitalmanagement.entity.User;
import com.hospital.management.api.features.hospitalmanagement.repository.PatientRepository;
import com.hospital.management.api.features.hospitalmanagement.repository.PermissionRepository;
import com.hospital.management.api.features.hospitalmanagement.repository.RoleRepository;
import com.hospital.management.api.features.hospitalmanagement.repository.UserRepository;
import com.hospital.management.api.features.hospitalmanagement.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final OurUserDetailsService ourUserDetailsService;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final PatientRepository patientRepository;

    @Override
    public PatientRegisterResponse registerPatient(PatienRegister request) {
        PatientRegisterResponse response = new PatientRegisterResponse();
        try {
            User user = new User();
            Role roleWithPermissions = createRoleWithPermissions();
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRoleId(roleWithPermissions.getId()); // Converts Role to Set<Role>
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setGender(request.getGender());
            User userResult = userRepository.save(user);

            Patient patient = new Patient();

            patient.setUserId(userResult.getId());
            patient.setFirstName(request.getFirstName());
            patient.setLastName(request.getLastName());
            patient.setDateOfBirth(request.getDateOfBirth());
            patient.setGender(request.getGender());
            patient.setContactNumber(request.getContactNumber());
            patient.setCity(request.getCity());
            patient.setCountry(request.getCountry());
            patient.setBloodGroup(request.getBloodGroup());
            patient.setAllergies(request.getAllergies());
            patient.setStatus(request.getStatus());
            patientRepository.save(patient);

            response.setMessage("Create patient successfully");
            response.setStatus(GlobalConstant.SUCCESS);
            response.setCode(GlobalConstant.CODE);
            return response;
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public BaseResponse<LoginResponse> login(LoginRequest request) {
        BaseResponse<LoginResponse> response = new BaseResponse<>();
        try {

            LoginResponse loginResponse = new LoginResponse();
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            CustomUserDetail userInfo = ourUserDetailsService.loadUserByUsername(request.getEmail());
            var jwt = jwtUtils.generateToken(userInfo);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), userInfo);

            loginResponse.setToken(jwt);
            loginResponse.setRefreshToken(refreshToken);
            loginResponse.setFirstName(userInfo.getFirstName());
            loginResponse.setLastName(userInfo.getLastName());
            loginResponse.setGender(userInfo.getGender());
            loginResponse.setRole(userInfo.getRoleName());

            response.setMessage("login successfully");
            response.setStatus(GlobalConstant.SUCCESS);
            response.setCode(GlobalConstant.CODE);
            response.setData(loginResponse);
            return response;
        } catch (BadCredentialsException ex) {
          throw new CustomAuthenticationException("Invalid email or password", HttpStatus.BAD_REQUEST);
          } 
        catch (Exception e) {
            throw e;
        }
    }

    private Role createRoleWithPermissions() {
        // Ensure permissions exist or create them
        Permission read = permissionRepository.findByName("READ_PRIVILEGE")
                .orElseGet(() -> createPermission("READ_PRIVILEGE"));

        Permission write = permissionRepository.findByName("WRITE_PRIVILEGE")
                .orElseGet(() -> createPermission("WRITE_PRIVILEGE"));

        // Ensure role exists or create it with permissions
        Role userRole = roleRepository.findByName("USER")
                .orElseGet(() -> createRole("USER", Set.of(read, write)));
        return userRole;

    }

    // Separate method to create permissions
    private Permission createPermission(String name) {
        Permission newPermission = new Permission(name);
        return permissionRepository.save(newPermission); // Save and return the new permission
    }

    // Separate method to create roles with permissions
    private Role createRole(String name, Set<Permission> permissions) {
        Role newRole = new Role(name, permissions);
        return roleRepository.save(newRole); // Save and return the new role
    }

    @Override
    public RefreshTokenResponse refreshToken(RefreshTokenRequest request) {
        RefreshTokenResponse response = new RefreshTokenResponse();
        try {
            String userEmail = jwtUtils.extractUsername(request.getToken());
        
            // Date expirationToken = jwtUtils.extractExpiration(request.getToken());
            // Date expirationRefreshToken= jwtUtils.extractExpiration(request.getRefreshToken());

            CustomUserDetail userInfo = ourUserDetailsService.loadUserByUsername(userEmail);
            if (jwtUtils.validateToken(request.getRefreshToken(), userInfo)) {
                var jwt = jwtUtils.generateToken(userInfo);
                response.setRefreshToken(request.getRefreshToken());
                response.setToken(jwt);
                response.setCode(200);
                response.setMessage("refreshToken successfully");
                response.setStatus(GlobalConstant.SUCCESS);
            }
            return response;
        } catch (Exception e) {
             throw e;
        }
    }

    @Override
    public void addPermissionToRole(RolePermissionRequest request) {
        Role role = roleRepository.findByName(request.getRoleName())
                .orElseThrow(() -> new ResourceNotFoundException("Role Name Not Found " + request.getRoleName(),
                        HttpStatus.NOT_FOUND));
        Permission permission = permissionRepository.findByName(request.getPermissionName())
                .orElseGet(() -> createPermission(request.getPermissionName()));
        role.getPermissions().add(permission);
        roleRepository.save(role); // Save changes
    }

    @Override
    public void removePermissionFromRole(RolePermissionRequest request) {
        Role role = roleRepository.findByName(request.getRoleName())
                .orElseThrow(() -> new ResourceNotFoundException("Role Name Not Found " + request.getRoleName(),
                        HttpStatus.NOT_FOUND));
        role.getPermissions().removeIf(permission -> permission.getName().equals(request.getPermissionName()));
        roleRepository.save(role); // Save changes
    }

    @Override
    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {
        String username = connectedUser.getName(); // This is safe
        User user = userRepository.findByEmail(username)
                .orElseThrow(() ->   new  ResourceNotFoundException("User Not Found :"+username, HttpStatus.NOT_FOUND));
        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }
        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        // save the new password
        userRepository.save(user);
    }
}
