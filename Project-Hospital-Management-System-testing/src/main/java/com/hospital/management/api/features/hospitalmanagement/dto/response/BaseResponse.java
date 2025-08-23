package com.hospital.management.api.features.hospitalmanagement.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponse<T> {
    private String status;
    private String message;
    private int code;
    private T data;
}

