package com.hospital.management.api.features.hospitalmanagement.dto.request.validator.datetime;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class FlexibleLocalDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {
    @Override
    public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String input = p.getText();
        for (DateTimeFormatter formatter : SUPPORTED_FORMATS) {
            try {
                return LocalDateTime.parse(input, formatter);
            } catch (DateTimeParseException ignored) {
            }
        }
        throw new IOException(
                "Invalid datetime format. Supported formats: yyyy-MM-ddTHH:mm:ss, yyyy-MM-dd:HH:mm:ss, yyyy-MM-dd HH:mm:ss.SSS");
    }

    private static final DateTimeFormatter[] SUPPORTED_FORMATS = new DateTimeFormatter[] {
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"),
            DateTimeFormatter.ofPattern("yyyy-MM-d HH:mm:ss"),
            DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"),
            DateTimeFormatter.ofPattern("yyyy-MM-dd:HH:mm:ss"),
            DateTimeFormatter.ofPattern("yyyy-MM-d HH:mm:ss.SSS"), // supports single-digit day
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS") // standard with space + millis
    };

}