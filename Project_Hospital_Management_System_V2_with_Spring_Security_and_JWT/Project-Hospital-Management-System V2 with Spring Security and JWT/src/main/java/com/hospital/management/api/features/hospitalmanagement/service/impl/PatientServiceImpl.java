package com.hospital.management.api.features.hospitalmanagement.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.hospital.management.api.core.exceptions.ResourceNotFoundException;
import com.hospital.management.api.core.utils.GlobalConstant;
import com.hospital.management.api.features.hospitalmanagement.dto.request.PatienUpdate;
import com.hospital.management.api.features.hospitalmanagement.dto.response.BaseResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.PaginatedResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.PatientRespone;
import com.hospital.management.api.features.hospitalmanagement.dto.response.PatientResponeList;
import com.hospital.management.api.features.hospitalmanagement.entity.Patient;
import com.hospital.management.api.features.hospitalmanagement.entity.User;
import com.hospital.management.api.features.hospitalmanagement.enums.Gender;
import com.hospital.management.api.features.hospitalmanagement.enums.Status;
import com.hospital.management.api.features.hospitalmanagement.repository.AppointmentRepository;
import com.hospital.management.api.features.hospitalmanagement.repository.PatientRepository;
import com.hospital.management.api.features.hospitalmanagement.repository.UserRepository;
import com.hospital.management.api.features.hospitalmanagement.service.PatientService;
import com.hospital.management.api.features.hospitalmanagement.service.Specification.PatientSpecification;
import com.hospital.management.api.features.hospitalmanagement.util.PageUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;

    @Override
    public BaseResponse<PatientRespone> getOnePatient(Long patientId) {
        BaseResponse<PatientRespone> response = new BaseResponse<>();
        try {
            PatientRespone patientRespone = new PatientRespone();
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() -> new ResourceNotFoundException("Patient Not Found Id=" + patientId,
                            HttpStatus.NOT_FOUND));
            patientRespone.setPatientId(patient.getPatientId());
            patientRespone.setFirstName(patient.getFirstName());
            patientRespone.setLastName(patient.getLastName());
            patientRespone.setDateOfBirth(patient.getDateOfBirth());
            patientRespone.setGender(patient.getGender());
            patientRespone.setContactNumber(patient.getContactNumber());
            patientRespone.setCountry(patient.getCountry());
            patientRespone.setCity(patient.getCity());
            patientRespone.setBloodGroup(patient.getBloodGroup());
            patientRespone.setAllergies(patient.getAllergies());
            patientRespone.setStatus(patient.getStatus());
            response.setMessage("Get Patient successfully");
            response.setStatus(GlobalConstant.SUCCESS);
            response.setCode(GlobalConstant.CODE);
            response.setData(patientRespone);
            return response;
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    @Transactional
    public BaseResponse<Void> updatePatient(long patientId, PatienUpdate request) {
        BaseResponse<Void> response = new BaseResponse<>();

        try {
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() -> new ResourceNotFoundException("Patient Not Found Id=" + patientId,
                            HttpStatus.NOT_FOUND));
            User user = userRepository.findById(patient.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User Not Found Id=" + patientId,
                            HttpStatus.NOT_FOUND));

            user.setFirstName(patient.getFirstName());
            user.setLastName(patient.getLastName());
            user.setGender(patient.getGender());

            patient.setFirstName(request.getFirstName());
            patient.setLastName(request.getLastName());
            patient.setDateOfBirth(request.getDateOfBirth());
            patient.setGender(request.getGender());
            patient.setContactNumber(request.getContactNumber());
            patient.setCountry(request.getCountry());
            patient.setCity(request.getCity());
            patient.setBloodGroup(request.getBloodGroup());
            patient.setAllergies(request.getAllergies());
            patient.setStatus(request.getStatus());

            patientRepository.save(patient);
            userRepository.save(user);
            response.setMessage("Update Patient successfully");
            response.setStatus(GlobalConstant.SUCCESS);
            response.setCode(GlobalConstant.CODE);
            response.setData(null);

            return response;
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    @Override
    public BaseResponse<Void> deletePatient(long patientId) {
        BaseResponse<Void> response = new BaseResponse<>();

        try {
            // Check if the Patient exists
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() -> new ResourceNotFoundException("Patient Not Found Id=" + patientId,
                            HttpStatus.NOT_FOUND));

            // Delete User register
            userRepository.deleteById(patient.getUserId());
            // Delete dependent appointments
            appointmentRepository.deleteAllByPatient_PatientId(patientId);
            // Now delete the patient
            patientRepository.deleteById(patientId);
            // Prepare response
            response.setMessage("Delete Patient successfully");
            response.setStatus(GlobalConstant.SUCCESS);
            response.setCode(GlobalConstant.CODE);
            response.setData(null);
            return response;

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public PaginatedResponse<PatientResponeList> searchPatient(Map<String, String> params) {

        // 🎯 Extract filters
        Long patientId = params.containsKey("patientId") ? Long.valueOf(params.get("patientId")) : null;
        String fullName = params.get("fullName");
        Gender gender = params.containsKey("gender") ? Gender.valueOf(params.get("gender").toUpperCase()) : null;
        String contactNumber = params.get("contactNumber");
        String country = params.get("country");
        String bloodGroup = params.get("bloodGroup");
        String allergies = params.get("allergies");
        Status status = params.containsKey("status") ? Status.valueOf(params.get("status").toUpperCase()) : null;

        // 🧭 Pagination + Sorting with defaults
        int page = params.containsKey(PageUtil.PAGE_PARAM)
                ? Integer.parseInt(params.get(PageUtil.PAGE_PARAM))
                : PageUtil.DEFAULT_PAGE;

        int size = params.containsKey(PageUtil.SIZE_PARAM)
                ? Integer.parseInt(params.get(PageUtil.SIZE_PARAM))
                : PageUtil.DEFAULT_SIZE;
        String sortBy = params.get("sortBy");
        String sortDir = params.get("sortDir");

        Pageable pageable = PageUtil.getPageable(page, size, sortBy, sortDir);

        // 🔍 Build Specification
        Specification<Patient> spec = PatientSpecification.hasPatientId(patientId)
                .and(PatientSpecification.hasFullName(fullName))
                .and(PatientSpecification.hasGender(gender))
                .and(PatientSpecification.hasContactNumber(contactNumber))
                .and(PatientSpecification.hasCountry(country))
                .and(PatientSpecification.hasBloodGroup(bloodGroup))
                .and(PatientSpecification.hasAllergies(allergies))
                .and(PatientSpecification.hasStatus(status));

        // 🔄 Query and map
        Page<Patient> patientPage = patientRepository.findAll(spec, pageable);

        List<PatientResponeList> responseList = patientPage.getContent().stream()
                .map(p -> new PatientResponeList(
                        p.getPatientId(),
                        p.getFirstName() + " " + p.getLastName(),
                        p.getGender(),
                        p.getContactNumber(),
                        p.getCountry(),
                        p.getBloodGroup(),
                        p.getAllergies(),
                        p.getStatus(),
                        p.getCreatedAt()))
                .toList();

        return new PaginatedResponse<>(
                patientPage.getTotalElements(),
                responseList,
                patientPage.getTotalPages(), // totalPages
                patientPage.getNumber(), // currentPage (0-based)
                patientPage.getSize(), // pageSize
                patientPage.getNumberOfElements(), // numberOfItems on current page
                patientPage.isFirst(), // first
                patientPage.isLast(), // last
                patientPage.isEmpty() // empty
        );
    }
}
