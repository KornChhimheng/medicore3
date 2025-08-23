package com.hospital.management.api.core.daos.respone;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
	private HttpStatus status;
	private String message;
    private int code;
	protected String url;
}