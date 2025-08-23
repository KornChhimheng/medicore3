package com.hospital.management.api.features.hospitalmanagement.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.api.features.hospitalmanagement.dto.request.PatienUpdate;
import com.hospital.management.api.features.hospitalmanagement.dto.response.BaseResponse;
import com.hospital.management.api.features.hospitalmanagement.service.PatientService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
@RestController
public class PatientController {
    
    private final PatientService patientService;

	 // @RolesAllowed({"USER"}) // Prefix= "ROLE_"+roleName
	//@PreAuthorize("hasRole('ROLE_USER')") // Prefix= "ROLE_"+roleName
    //@PreAuthorize("hasAnyAuthority('ADMIN')")
   // @Secured("USER")
	@GetMapping("api/patient/{id}")
	public ResponseEntity<?> getOnePatient(@PathVariable("id") Long apptId){
		return ResponseEntity.ok(patientService.getOnePatient(apptId));
	}
   @PutMapping("api/patient/{id}")
    public ResponseEntity<BaseResponse<Void>> updatePatient(@PathVariable("id") Long apptId ,@Valid @RequestBody PatienUpdate request) {
        return ResponseEntity.ok(patientService.updatePatient(apptId,request));
    }
	@DeleteMapping("api/patient/{id}")
    public ResponseEntity<BaseResponse<Void>> deletePatient(@PathVariable("id") Long apptId) {
        return ResponseEntity.ok(patientService.deletePatient(apptId));
    }
	@GetMapping("api/patient")
	public ResponseEntity<?> getPatients(@RequestParam Map<String, String> params){
		return ResponseEntity.ok(patientService.searchPatient(params));
	}
	   // @PreAuthorize("hasAnyAuthority('ADMIN')")
  // @RolesAllowed({"ROLE_USER"})
    //@PreAuthorize("hasRole('ADMIN')")
    //@Secured("ADMIN")
    // @GetMapping("patient/{id}")
 	// public ResponseEntity<ApiResponse<Patient>> getOnePatient(@PathVariable Long id) throws Exception{	
	// 	System.out.println("Heelo");
	// 	System.out.println("Heelo");
	// 	ApiResponse<Patient> response = patientService.getById(id);
	// 	return ResponseEntity.ok(response);
	// }
}
