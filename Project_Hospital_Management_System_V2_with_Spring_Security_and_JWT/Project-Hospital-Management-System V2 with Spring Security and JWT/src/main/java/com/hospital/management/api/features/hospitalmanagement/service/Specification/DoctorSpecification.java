package com.hospital.management.api.features.hospitalmanagement.service.Specification;

import org.springframework.data.jpa.domain.Specification;

import com.hospital.management.api.features.hospitalmanagement.entity.Doctor;

import jakarta.persistence.criteria.Expression;

public class DoctorSpecification {

    public static Specification<Doctor> hasDoctorId(Long doctorId) {
        return (root, query, cb) -> doctorId == null ? null : cb.equal(root.get("doctorId"), doctorId);
    }

    public static Specification<Doctor> hasFullName(String fullName) {
        return (root, query, cb) -> {
            if (fullName == null || fullName.isBlank()) return null;

            Expression<String> fullNameExpression = cb.concat(
                    cb.lower(root.get("firstName")),
                    cb.concat(" ", cb.lower(root.get("lastName")))
            );
            return cb.like(fullNameExpression, "%" + fullName.toLowerCase() + "%");
        };
    }
    public static Specification<Doctor> hasContactNumber(String contactNumber) {
        return (root, query, cb) -> {
            if (contactNumber == null || contactNumber.isBlank()) return null;
            return cb.like(cb.lower(root.get("contactNumber")), "%" + contactNumber.toLowerCase() + "%");
        };
    }

    public static Specification<Doctor> hasCountry(String country) {
        return (root, query, cb) -> {
            if (country == null || country.isBlank()) return null;
            return cb.like(cb.lower(root.get("country")), "%" + country.toLowerCase() + "%");
        };
    }

    public static Specification<Doctor> hasSpecialization(String specialization) {
        return (root, query, cb) -> {
            if (specialization == null || specialization.isBlank()) return null;
            return cb.like(cb.lower(root.get("specialization")), "%" + specialization.toLowerCase() + "%");
        };
    }

    public static Specification<Doctor> hasBloodGroup(String bloodGroup) {
        return (root, query, cb) -> {
            if (bloodGroup == null || bloodGroup.isBlank()) return null;
            return cb.equal(cb.lower(root.get("bloodGroup")), bloodGroup.toLowerCase());
        };
    }
}
