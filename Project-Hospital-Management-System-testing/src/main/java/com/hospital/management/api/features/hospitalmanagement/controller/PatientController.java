package com.hospital.management.api.features.hospitalmanagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.management.api.core.daos.respone.ApiResponse;
import com.hospital.management.api.features.hospitalmanagement.entity.Patient;
import com.hospital.management.api.features.hospitalmanagement.service.PatientService;

import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
@RestController
public class PatientController {
    
    private final PatientService patientService;

	 // @RolesAllowed({"USER"}) // Prefix= "ROLE_"+roleName
	//@PreAuthorize("hasRole('ROLE_USER')") // Prefix= "ROLE_"+roleName
    //@PreAuthorize("hasAnyAuthority('ADMIN')")
   // @Secured("USER")
	// @GetMapping("/v1/patient")
	// public ResponseEntity<String> getPing(){
	// 	return ResponseEntity.ok("Hello Conected");
	// }
	    @GetMapping("patient/v1/{id}")
	public ResponseEntity<?>  ping (){	
		System.out.println("Heelo");
		System.out.println("Heelo");

		return ResponseEntity.ok("hhhhhhhhhhh");
	}
	   // @PreAuthorize("hasAnyAuthority('ADMIN')")
  // @RolesAllowed({"ROLE_USER"})
    //@PreAuthorize("hasRole('ADMIN')")
    //@Secured("ADMIN")
    @GetMapping("patient/{id}")
 	public ResponseEntity<ApiResponse<Patient>> getOnePatient(@PathVariable Long id) throws Exception{	
		System.out.println("Heelo");
		System.out.println("Heelo");
		ApiResponse<Patient> response = patientService.getById(id);
		return ResponseEntity.ok(response);
	}
}
