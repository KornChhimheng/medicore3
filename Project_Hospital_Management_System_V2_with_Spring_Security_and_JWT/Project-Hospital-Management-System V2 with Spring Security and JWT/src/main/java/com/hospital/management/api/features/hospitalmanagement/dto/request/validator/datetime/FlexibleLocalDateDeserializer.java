package com.hospital.management.api.features.hospitalmanagement.dto.request.validator.datetime;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class FlexibleLocalDateDeserializer extends JsonDeserializer<LocalDate> {

    private static final DateTimeFormatter[] SUPPORTED_FORMATS = new DateTimeFormatter[]{
            DateTimeFormatter.ofPattern("yyyy-MM-d"),
            DateTimeFormatter.ofPattern("yyyy-MM-dd"),
            DateTimeFormatter.ofPattern("yyyyMMdd"),
            DateTimeFormatter.ofPattern("dd-MM-yyyy"),
            DateTimeFormatter.ofPattern("dd/MM/yyyy"),
            DateTimeFormatter.ofPattern("dd MMM yyyy")
    };

    @Override
    public LocalDate deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String input = p.getText();
        for (DateTimeFormatter formatter : SUPPORTED_FORMATS) {
            try {
                return LocalDate.parse(input.trim(), formatter);
            } catch (DateTimeParseException ignored) {}
        }
        throw new IOException("Invalid date format: '" + input + "'. Supported formats include yyyy-MM-dd, dd-MM-yyyy, etc.");
    }
}
