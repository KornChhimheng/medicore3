package com.hospital.management.api.core.daos.respone;

import java.time.LocalDateTime;

import com.hospital.management.api.core.utils.GlobalConstant;

public class ApiResponse<T> {
    private String status = GlobalConstant.SUCCESS_CODE;
    private String message = GlobalConstant.SUCCESS;
    private T data;

    public ApiResponse() {
    }

    public ApiResponse(String status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
  

}