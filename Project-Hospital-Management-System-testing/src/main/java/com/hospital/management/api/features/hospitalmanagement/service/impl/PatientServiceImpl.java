package com.hospital.management.api.features.hospitalmanagement.service.impl;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.hospital.management.api.core.daos.respone.ApiResponse;
import com.hospital.management.api.core.exceptions.ApiException;
import com.hospital.management.api.core.exceptions.ResourceNotFoundException;
import com.hospital.management.api.features.hospitalmanagement.entity.Patient;
import com.hospital.management.api.features.hospitalmanagement.repository.PatientRepository;
import com.hospital.management.api.features.hospitalmanagement.service.PatientService;

import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
@Service
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    @Override
    public Patient create(Patient patient) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    @Override
    public ApiResponse<Patient> getById(Long id){
        try {
             ApiResponse<Patient> response= new ApiResponse<Patient>(); 
             
            Optional<Patient> patient = patientRepository.findById(id);
            if(!patient.isPresent()){
             throw new ResourceNotFoundException("patient Not Found Id="+id,HttpStatus.NOT_FOUND);
            }
            response.setData(patient.get());
            return response;
        } catch (Exception e) {
           throw e;
        }
     
         //return patientRepository.findById(id).orElseThrow(()-> new Exception("Patient not found"));

        // try {

        // return patientRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Patient",id));
        //    // return patientRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Patient",id));

        // } catch (Exception e) {
        //    throw e;
        // }
        //    BaseResponse respone=new BaseResponse();
        //    respone.setMessage("Patient retrieved successfully");
        //    respone.setStatus(GlobalConstant.SUCCESS);  
        //  Patient patient= patientRepository.findById(id).orElseThrow(()-> new ApiException(HttpStatus.BAD_REQUEST,"ffff"));
            // respone.setData(patient);
            // return respone;
    }
    
}
