package com.hospital.management.api.features.hospitalmanagement.dto.request.validator.contactnumber;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueContactNumberValidator.class)
@Documented
public @interface UniqueContactNumber {
    String message() default "Contact number already exists!";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
