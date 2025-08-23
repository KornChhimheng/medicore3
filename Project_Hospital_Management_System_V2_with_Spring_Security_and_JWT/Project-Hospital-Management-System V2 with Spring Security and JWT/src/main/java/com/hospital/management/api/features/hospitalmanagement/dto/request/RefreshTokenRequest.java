package com.hospital.management.api.features.hospitalmanagement.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefreshTokenRequest {
    private String token;
    private String refreshToken;
}
