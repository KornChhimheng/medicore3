package com.hospital.management.api.features.hospitalmanagement.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefreshTokenResponse {
    private String token;
    private String refreshToken;
    private String status;
    private String message;
    private int code;
}
