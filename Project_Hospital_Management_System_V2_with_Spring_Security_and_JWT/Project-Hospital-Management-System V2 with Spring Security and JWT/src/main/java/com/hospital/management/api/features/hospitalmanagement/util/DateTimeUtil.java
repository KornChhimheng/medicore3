package com.hospital.management.api.features.hospitalmanagement.util;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class DateTimeUtil {

    // Function to parse and get the date
    public static LocalDate getDatePart(String dateTimeString) {
        LocalDateTime dateTime = parseDateTime(dateTimeString);
        return dateTime.toLocalDate();
    }

    // Function to parse and get the time
    public static LocalTime getTimePart(String dateTimeString) {
        LocalDateTime dateTime = parseDateTime(dateTimeString);
        return dateTime.toLocalTime();
    }
      // Function to get the date part from LocalDateTime
    public static LocalDate getDatePart(LocalDateTime scheduledOn) {
        return scheduledOn.toLocalDate();
    }
    // Function to get the time part from LocalDateTime
    // public static LocalTime getTimePart(LocalDateTime scheduledOn) {
    //     return scheduledOn.toLocalTime();
    // }
    // Function to get the time part with AM/PM from LocalDateTime
    public static String getTimePart(LocalDateTime scheduledOn) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("hh:mm a");
        return scheduledOn.toLocalTime().format(formatter);
    }

    // Helper function to parse string into LocalDateTime
    private static LocalDateTime parseDateTime(String dateTimeString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(dateTimeString, formatter);
    }
    
}
