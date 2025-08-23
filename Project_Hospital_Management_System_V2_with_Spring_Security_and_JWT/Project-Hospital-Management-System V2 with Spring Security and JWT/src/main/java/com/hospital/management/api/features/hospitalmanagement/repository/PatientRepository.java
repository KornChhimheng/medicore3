package com.hospital.management.api.features.hospitalmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.hospital.management.api.features.hospitalmanagement.entity.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient,Long>,JpaSpecificationExecutor<Patient>  {

    
}
