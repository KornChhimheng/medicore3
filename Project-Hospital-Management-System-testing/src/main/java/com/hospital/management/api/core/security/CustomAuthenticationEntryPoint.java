package com.hospital.management.api.core.security;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hospital.management.api.core.daos.respone.ErrorResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private final ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        var errorResponse = new ErrorResponse();
        errorResponse.setCode(HttpStatus.UNAUTHORIZED.value());
        errorResponse.setMessage("Authentication is required to access this resource");
        errorResponse.setStatus(HttpStatus.UNAUTHORIZED);
        errorResponse.setUrl(request.getRequestURI());

        var msgJson = objectMapper.writeValueAsString(errorResponse);

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(String.valueOf(MediaType.APPLICATION_JSON));
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(msgJson);
    }
}
