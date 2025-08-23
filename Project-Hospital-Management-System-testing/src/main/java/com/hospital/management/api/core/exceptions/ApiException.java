package com.hospital.management.api.core.exceptions;

import org.springframework.http.HttpStatus;

public class ApiException  extends RuntimeException {
    protected int code;
	protected HttpStatus status;
    protected String message;

	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public HttpStatus getStatus() {
		return status;
	}
	public void setStatus(HttpStatus status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}

  }