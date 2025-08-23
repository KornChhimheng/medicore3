package com.hospital.management.api.features.hospitalmanagement.dto.response;

import com.hospital.management.api.features.hospitalmanagement.enums.Gender;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private Long userId;
    private String firstName;
    private String lastName;
    private Gender gender; 
    private String token;
    private String refreshToken;
	private String role;

}
