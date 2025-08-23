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
import com.hospital.management.api.features.hospitalmanagement.dto.request.DoctorUpdate;
import com.hospital.management.api.features.hospitalmanagement.dto.response.BaseResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.DoctorResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.DoctorResponseList;
import com.hospital.management.api.features.hospitalmanagement.dto.response.PaginatedResponse;
import com.hospital.management.api.features.hospitalmanagement.entity.Doctor;
import com.hospital.management.api.features.hospitalmanagement.entity.User;
import com.hospital.management.api.features.hospitalmanagement.repository.AppointmentRepository;
import com.hospital.management.api.features.hospitalmanagement.repository.DoctorRepository;
import com.hospital.management.api.features.hospitalmanagement.repository.UserRepository;
import com.hospital.management.api.features.hospitalmanagement.service.DoctorService;
import com.hospital.management.api.features.hospitalmanagement.service.Specification.DoctorSpecification;
import com.hospital.management.api.features.hospitalmanagement.util.PageUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class DoctorServiceImpl implements DoctorService {
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;

    @Override
    public BaseResponse<DoctorResponse> getOneDoctor(Long doctorId) {
        try {
            DoctorResponse doctorResponse = new DoctorResponse();
            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() -> new ResourceNotFoundException("Doctor Not Found Id=" + doctorId,
                            HttpStatus.NOT_FOUND));

            doctorResponse.setDoctorId(doctor.getDoctorId());
            doctorResponse.setFirstName(doctor.getFirstName());
            doctorResponse.setLastName(doctor.getLastName());
            doctorResponse.setContactNumber(doctor.getContactNumber());
            doctorResponse.setGender(doctor.getGender());
            doctorResponse.setDateOfBirth(doctor.getDateOfBirth());
            doctorResponse.setCity(doctor.getCity());
            doctorResponse.setCountry(doctor.getCountry());
            doctorResponse.setSpecialization(doctor.getSpecialization());
            doctorResponse.setBloodGroup(doctor.getBloodGroup());

            BaseResponse<DoctorResponse> response = new BaseResponse<>();
            response.setMessage("Doctor found successfully.");
            response.setStatus(GlobalConstant.SUCCESS);
            response.setCode(GlobalConstant.CODE);
            response.setData(doctorResponse);

            return response;
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    @Override
    public BaseResponse<Void> deleteDoctor(long doctorId) {
        BaseResponse<Void> response = new BaseResponse<>();
        try {
            // Check if the Doctor exists
            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() -> new ResourceNotFoundException("Doctor Not Found Id=" + doctorId,
                            HttpStatus.NOT_FOUND));

            // Delete User register
            userRepository.deleteById(doctor.getUserId());
            // Delete dependent appointments
            appointmentRepository.deleteAllByDoctor_DoctorId(doctorId);
            // Now delete the doctor
            doctorRepository.deleteById(doctorId);
            // Prepare response
            response.setMessage("Delete Doctor successfully");
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
    public BaseResponse<Void> updateDoctor(long doctorId, DoctorUpdate request) {
        BaseResponse<Void> response = new BaseResponse<>();

        try {

            // Find the existing doctor or throw
            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() -> new ResourceNotFoundException("Doctor Not Found Id=" + doctorId,
                            HttpStatus.NOT_FOUND));
            User user = userRepository.findById(doctor.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User Not Found Id=" + doctor.getUserId(),
                            HttpStatus.NOT_FOUND));

            user.setFirstName(doctor.getFirstName());
            user.setLastName(doctor.getLastName());
            user.setGender(doctor.getGender());
            // Update fields from the request DTO
            doctor.setFirstName(request.getFirstName());
            doctor.setLastName(request.getLastName());
            doctor.setContactNumber(request.getContactNumber());
            doctor.setGender(request.getGender());
            doctor.setDateOfBirth(request.getDateOfBirth());
            doctor.setCity(request.getCity());
            doctor.setCountry(request.getCountry());
            doctor.setSpecialization(request.getSpecialization());
            doctor.setBloodGroup(request.getBloodGroup());

            // updated doctor
            doctorRepository.save(doctor);
            // update user
            userRepository.save(user);

            // Prepare response
            response.setMessage("Doctor updated successfully.");
            response.setStatus(GlobalConstant.SUCCESS);
            response.setCode(GlobalConstant.CODE);
            response.setData(null);
            return response;
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public PaginatedResponse<DoctorResponseList> searchDoctor(Map<String, String> params) {
        // Extract filters
        Long doctorId = params.containsKey("doctorId") ? Long.valueOf(params.get("doctorId")) : null;
        String fullName = params.get("fullName");
        String contactNumber = params.get("contactNumber");
        String country = params.get("country");
        String specialization = params.get("specialization");
        String bloodGroup = params.get("bloodGroup");

        // Paging & sorting
        int page = params.containsKey(PageUtil.PAGE_PARAM)
                ? Integer.parseInt(params.get(PageUtil.PAGE_PARAM))
                : PageUtil.DEFAULT_PAGE;

        int size = params.containsKey(PageUtil.SIZE_PARAM)
                ? Integer.parseInt(params.get(PageUtil.SIZE_PARAM))
                : PageUtil.DEFAULT_SIZE;

        String sortBy = params.get("sortBy");
        String sortDir = params.get("sortDir");
        Pageable pageable = PageUtil.getPageable(page, size, sortBy, sortDir);

        // Combine specifications
        Specification<Doctor> spec = DoctorSpecification.hasDoctorId(doctorId)
                .and(DoctorSpecification.hasFullName(fullName))
                .and(DoctorSpecification.hasContactNumber(contactNumber))
                .and(DoctorSpecification.hasCountry(country))
                .and(DoctorSpecification.hasSpecialization(specialization))
                .and(DoctorSpecification.hasBloodGroup(bloodGroup));

        // Query
        Page<Doctor> doctorPage = doctorRepository.findAll(spec, pageable);

        List<DoctorResponseList> responseList = doctorPage.getContent().stream().map(doc -> new DoctorResponseList(
                doc.getDoctorId(),
                doc.getFirstName() + " " + doc.getLastName(),
                doc.getContactNumber(),
                doc.getCountry(),
                doc.getSpecialization(),
                doc.getCreatedAt()
               )).toList();
        return new PaginatedResponse<>(
                doctorPage.getTotalElements(),
                responseList,
                doctorPage.getTotalPages(),
                doctorPage.getNumber(),
                doctorPage.getSize(),
                doctorPage.getNumberOfElements(),
                doctorPage.isFirst(),
                doctorPage.isLast(),
                doctorPage.isEmpty());
    }

}
