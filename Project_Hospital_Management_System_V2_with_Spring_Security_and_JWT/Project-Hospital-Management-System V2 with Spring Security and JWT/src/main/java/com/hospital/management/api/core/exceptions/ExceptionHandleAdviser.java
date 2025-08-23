package com.hospital.management.api.core.exceptions;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hospital.management.api.core.daos.respone.ErrorResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintDeclarationException;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class ExceptionHandleAdviser extends ResponseEntityExceptionHandler {

  private final HttpServletRequest httpServletRequest;

  public ExceptionHandleAdviser(HttpServletRequest httpServletRequest) {
    this.httpServletRequest = httpServletRequest;
  }
  @ExceptionHandler(value = { Exception.class })
  protected ResponseEntity<ErrorResponse> handleConflict(Exception erroreException, WebRequest request)
      throws JsonProcessingException {
    String queryString = httpServletRequest.getRequestURI();
    String method = httpServletRequest.getMethod();
    String contentType = httpServletRequest.getContentType();
    var errorResponse = new ErrorResponse();
    errorResponse.setUrl(queryString);

    Throwable ocurredException = ExceptionUtils.getRootCause(erroreException);
    // Throwable throwable = erroreException.getCause();
    // Object ocurredException = throwable != null ? throwable : erroreException;
    switch (ocurredException) {
      case ResourceNotFoundException resourceNotFoundException -> {
        errorResponse.setMessage(resourceNotFoundException.getMessage());
        errorResponse.setStatus(resourceNotFoundException.getStatus());
        errorResponse.setCode(resourceNotFoundException.getStatus().value());
      }
      case CustomAuthenticationException customAuthenticationException -> {

        errorResponse.setMessage(customAuthenticationException.getMessage());
        errorResponse.setStatus(customAuthenticationException.getStatus());
        errorResponse.setCode(customAuthenticationException.getStatus().value());
      }
      case ApiException appException -> {
        errorResponse.setMessage(appException.getMessage());
        errorResponse.setStatus(appException.getStatus());
        errorResponse.setCode(appException.getStatus().value());
      }
      default -> {
        errorResponse.setMessage(erroreException.getMessage());
        errorResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        errorResponse.setCode(HttpStatus.EXPECTATION_FAILED.value());

      }
    }
    logger.info(errorResponse);

    return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
      HttpHeaders headers,
      HttpStatusCode status,
      WebRequest request) {
    String message = ex.getBindingResult().getFieldErrors()
        .stream()
        .map(FieldError::getDefaultMessage)
        .collect(Collectors.toSet())
        .toString()
        .replaceAll("\\[*]*", "");

    ErrorResponse errorResponse = new ErrorResponse();
    errorResponse.setMessage(message);
    errorResponse.setStatus(HttpStatus.BAD_REQUEST);
    errorResponse.setCode(HttpStatus.BAD_REQUEST.value());
    errorResponse.setUrl(((ServletWebRequest) request).getRequest().getRequestURI());
    return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ErrorResponse> handleConstraintViolation(ConstraintViolationException ex, WebRequest request) {
    String message = "Validation failed: " + ex.getMessage();

    ErrorResponse errorResponse = new ErrorResponse();
    errorResponse.setMessage(message);
    errorResponse.setStatus(HttpStatus.BAD_REQUEST);
    errorResponse.setCode(HttpStatus.BAD_REQUEST.value());
    errorResponse.setUrl(((ServletWebRequest) request).getRequest().getRequestURI());

    return ResponseEntity.badRequest().body(errorResponse);
  }

  @ExceptionHandler(ConstraintDeclarationException.class)
  public ResponseEntity<ErrorResponse> handleConstraintDeclaration(ConstraintDeclarationException ex,
      WebRequest request) {
    String message = "Invalid constraint configuration: " + ex.getMessage();

    ErrorResponse errorResponse = new ErrorResponse();
    errorResponse.setMessage(message);
    errorResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    errorResponse.setCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
    errorResponse.setUrl(((ServletWebRequest) request).getRequest().getRequestURI());
    return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
  }

  @Override
  protected ResponseEntity<Object> handleHttpMessageNotReadable(
      HttpMessageNotReadableException ex,
      HttpHeaders headers,
      HttpStatusCode status,
      WebRequest request) {

    String message = "Invalid request body. Please check the input.";

    Throwable rootCause = ex.getMostSpecificCause();
    if (rootCause instanceof com.fasterxml.jackson.databind.exc.InvalidFormatException invalidEx) {
      Class<?> enumClass = invalidEx.getTargetType();
      if (enumClass.isEnum()) {
        String enumName = enumClass.getSimpleName(); // e.g., "Gender"
        String allowedValues = Arrays.stream(enumClass.getEnumConstants())
            .map(Object::toString)
            .collect(Collectors.joining(", "));
        message = "Invalid value for " + enumName + ". Allowed values: " + allowedValues + ".";
      }
    }
    ErrorResponse error = new ErrorResponse();
    error.setMessage(message);
    error.setStatus(HttpStatus.BAD_REQUEST);
    error.setCode(HttpStatus.BAD_REQUEST.value());
    error.setUrl(((ServletWebRequest) request).getRequest().getRequestURI());

    return ResponseEntity.status(error.getStatus()).body(error);
  }
  @Override
protected ResponseEntity<Object> handleNoHandlerFoundException(
        NoHandlerFoundException ex,
        HttpHeaders headers,
        HttpStatusCode status,
        WebRequest request) {

    String path = ex.getRequestURL();

    ErrorResponse error = new ErrorResponse();
    error.setCode(HttpStatus.NOT_FOUND.value());
    error.setStatus(HttpStatus.NOT_FOUND);
    error.setUrl(path);
    error.setMessage("The endpoint you requested does not exist: " + path);

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
}
}
