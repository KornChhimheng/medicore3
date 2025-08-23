package com.hospital.management.api.features.hospitalmanagement.dto.request.validator.contactnumber;

import org.springframework.stereotype.Component;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class UniqueContactNumberValidator implements ConstraintValidator<UniqueContactNumber, String> {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public boolean isValid(String contactNumber, ConstraintValidatorContext context) {
        if (contactNumber == null || contactNumber.isEmpty()) {
            return true;
        }
        TypedQuery<Long> query = entityManager.createQuery(
            "SELECT COUNT(p) FROM Patient p WHERE p.contactNumber = :contactNumber", Long.class);
        query.setParameter("contactNumber", contactNumber);
        Long count = query.getSingleResult();
        return count == 0;
    }
}
