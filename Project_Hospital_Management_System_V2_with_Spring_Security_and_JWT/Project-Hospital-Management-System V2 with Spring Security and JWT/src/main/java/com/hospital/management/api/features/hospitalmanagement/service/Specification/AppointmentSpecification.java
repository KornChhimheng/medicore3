package com.hospital.management.api.features.hospitalmanagement.service.Specification;

import org.springframework.data.jpa.domain.Specification;

import com.hospital.management.api.features.hospitalmanagement.entity.Appointment;

import jakarta.persistence.criteria.Expression;

public class AppointmentSpecification {

    public static Specification<Appointment> hasDoctorId(Long doctorId) {
        return (root, query, cb) ->
            doctorId == null ? null : cb.equal(root.get("doctor").get("doctorId"), doctorId);
    }

    public static Specification<Appointment> hasDoctorName(String doctorName) {
        return (root, query, cb) -> {
            if (doctorName == null || doctorName.isBlank()) return null;
            Expression<String> fullName = cb.concat(root.get("doctor").get("lastName"),
                                                     cb.concat(" ", root.get("doctor").get("firstName")));
            return cb.like(cb.lower(fullName), "%" + doctorName.toLowerCase() + "%");
        };
    }

    public static Specification<Appointment> hasPatientName(String patientName) {
        return (root, query, cb) -> {
            if (patientName == null || patientName.isBlank()) return null;
            Expression<String> fullName = cb.concat(root.get("patient").get("lastName"),
                                                     cb.concat(" ", root.get("patient").get("firstName")));
            return cb.like(cb.lower(fullName), "%" + patientName.toLowerCase() + "%");
        };
    }
}
