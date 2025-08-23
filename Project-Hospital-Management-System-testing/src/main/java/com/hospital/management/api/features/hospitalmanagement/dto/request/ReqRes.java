package com.hospital.management.api.features.hospitalmanagement.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.hospital.management.api.features.hospitalmanagement.dto.request.validator.email.UniqueEmail;
import com.hospital.management.api.features.hospitalmanagement.entity.User;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReqRes {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String name;
    @NotEmpty
    @Email
    @UniqueEmail(message="Email already has!")
    @Column(unique = true)
    private String email;
    private String role;
    private String password;
    private User user;
}