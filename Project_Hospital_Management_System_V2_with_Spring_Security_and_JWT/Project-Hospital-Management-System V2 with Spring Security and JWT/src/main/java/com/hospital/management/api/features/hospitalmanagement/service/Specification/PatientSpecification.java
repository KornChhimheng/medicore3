package com.hospital.management.api.features.hospitalmanagement.service.Specification;
import org.springframework.data.jpa.domain.Specification;

import com.hospital.management.api.features.hospitalmanagement.entity.Patient;
import com.hospital.management.api.features.hospitalmanagement.enums.Gender;
import com.hospital.management.api.features.hospitalmanagement.enums.Status;

import jakarta.persistence.criteria.Expression;

public class PatientSpecification {

    public static Specification<Patient> hasPatientId(Long patientId) {
        return (root, query, cb) -> {
            if (patientId == null) return null;
            return cb.equal(root.get("patientId"), patientId);
        };
    }

    public static Specification<Patient> hasFullName(String fullName) {
        return (root, query, cb) -> {
            if (fullName == null || fullName.isBlank()) return null;

            // Concatenate firstName and lastName with space: "lastName firstName"
            Expression<String> fullNameExpression = cb.concat(
                cb.lower(root.get("lastName")), 
                cb.concat(" ", cb.lower(root.get("firstName")))
            );
            return cb.like(fullNameExpression, "%" + fullName.toLowerCase() + "%");
        };
    }

    public static Specification<Patient> hasGender(Gender gender) {
        return (root, query, cb) -> {
            if (gender == null) return null;
            return cb.equal(root.get("gender"), gender);
        };
    }

    public static Specification<Patient> hasContactNumber(String contactNumber) {
        return (root, query, cb) -> {
            if (contactNumber == null || contactNumber.isBlank()) return null;
            return cb.like(cb.lower(root.get("contactNumber")), "%" + contactNumber.toLowerCase() + "%");
        };
    }

    public static Specification<Patient> hasCountry(String country) {
        return (root, query, cb) -> {
            if (country == null || country.isBlank()) return null;
            return cb.like(cb.lower(root.get("country")), "%" + country.toLowerCase() + "%");
        };
    }

    public static Specification<Patient> hasBloodGroup(String bloodGroup) {
        return (root, query, cb) -> {
            if (bloodGroup == null || bloodGroup.isBlank()) return null;
            return cb.equal(cb.lower(root.get("bloodGroup")), bloodGroup.toLowerCase());
        };
    }

    public static Specification<Patient> hasAllergies(String allergies) {
        return (root, query, cb) -> {
            if (allergies == null || allergies.isBlank()) return null;
            return cb.like(cb.lower(root.get("allergies")), "%" + allergies.toLowerCase() + "%");
        };
    }

    public static Specification<Patient> hasStatus(Status status) {
        return (root, query, cb) -> {
            if (status == null) return null;
            return cb.equal(root.get("status"), status);
        };
    }
}
