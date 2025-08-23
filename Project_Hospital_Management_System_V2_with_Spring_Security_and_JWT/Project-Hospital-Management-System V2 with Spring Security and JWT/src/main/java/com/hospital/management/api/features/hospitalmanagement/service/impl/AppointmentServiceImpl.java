package com.hospital.management.api.features.hospitalmanagement.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.hospital.management.api.core.exceptions.ResourceNotFoundException;
import com.hospital.management.api.core.utils.GlobalConstant;
import com.hospital.management.api.features.hospitalmanagement.dto.request.AppointmentRequest;
import com.hospital.management.api.features.hospitalmanagement.dto.request.AppointmentRequestUpdate;
import com.hospital.management.api.features.hospitalmanagement.dto.response.AppointmentRespone;
import com.hospital.management.api.features.hospitalmanagement.dto.response.AppointmentResponeList;
import com.hospital.management.api.features.hospitalmanagement.dto.response.BaseResponse;
import com.hospital.management.api.features.hospitalmanagement.dto.response.PaginatedResponse;
import com.hospital.management.api.features.hospitalmanagement.entity.Appointment;
import com.hospital.management.api.features.hospitalmanagement.entity.Doctor;
import com.hospital.management.api.features.hospitalmanagement.entity.Patient;
import com.hospital.management.api.features.hospitalmanagement.repository.AppointmentRepository;
import com.hospital.management.api.features.hospitalmanagement.repository.DoctorRepository;
import com.hospital.management.api.features.hospitalmanagement.repository.PatientRepository;
import com.hospital.management.api.features.hospitalmanagement.service.AppointmentService;
import com.hospital.management.api.features.hospitalmanagement.service.Specification.AppointmentSpecification;
import com.hospital.management.api.features.hospitalmanagement.service.criteriaquery.AppointmentCriteria;
import com.hospital.management.api.features.hospitalmanagement.util.DateTimeUtil;
import com.hospital.management.api.features.hospitalmanagement.util.PageUtil;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentCriteria appointmentCriteria;

    @Override
    public BaseResponse<Void> createAppointment(AppointmentRequest request) {
        BaseResponse<Void> response = new BaseResponse<>();

        try {
            Appointment appointment = new Appointment();
            appointment.setScheduledOn(request.getScheduledOn());
            Doctor doctor = doctorRepository.findById(request.getDoctorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Doctor Not Found Id=" + request.getDoctorId(),
                            HttpStatus.NOT_FOUND));

            Patient patient = patientRepository.findById(request.getPatientId())
                    .orElseThrow(() -> new ResourceNotFoundException("Patient Not Found Id=" + request.getDoctorId(),
                            HttpStatus.NOT_FOUND));

            appointment.setPatient(patient);
            appointment.setDoctor(doctor);
            appointmentRepository.save(appointment);

            response.setMessage("Create Appointment successfully");
            response.setStatus(GlobalConstant.SUCCESS);
            response.setCode(GlobalConstant.CODE);
            response.setData(null);
            return response;
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public BaseResponse<Void> updateAppointment(long apptId, AppointmentRequestUpdate request) {
        BaseResponse<Void> response = new BaseResponse<>();

        try {
            // Fetch existing appointment
            Appointment appointment = appointmentRepository.findById(apptId)
                    .orElseThrow(() -> new ResourceNotFoundException("Appointment Not Found Id=" + apptId,
                            HttpStatus.NOT_FOUND));

            // Fetch and validate doctor
            Doctor doctor = doctorRepository.findById(request.getDoctorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Doctor Not Found Id=" + request.getDoctorId(),
                            HttpStatus.NOT_FOUND));

            // Fetch and validate patient
            Patient patient = patientRepository.findById(request.getPatientId())
                    .orElseThrow(() -> new ResourceNotFoundException("Patient Not Found Id=" + request.getPatientId(),
                            HttpStatus.NOT_FOUND));

            // Update appointment details
            appointment.setDoctor(doctor);
            appointment.setPatient(patient);
            appointment.setScheduledOn(request.getScheduledOn());

            // Save updated appointment
            appointmentRepository.save(appointment);

            response.setMessage("Update Appointment successfully");
            response.setStatus(GlobalConstant.SUCCESS);
            response.setCode(GlobalConstant.CODE);
            response.setData(null);
            return response;

        } catch (Exception e) {
            throw e; // optionally log and wrap in a custom exception
        }
    }

    @Override
    public BaseResponse<Void> deleteAppointment(long apptId) {
        BaseResponse<Void> response = new BaseResponse<>();

        try {
            // Check if the appointment exists
            appointmentRepository.findById(apptId)
                    .orElseThrow(() -> new ResourceNotFoundException("Appointment Not Found Id=" + apptId,
                            HttpStatus.NOT_FOUND));

            // Delete the appointment
            appointmentRepository.deleteById(apptId);

            // Prepare response
            response.setMessage("Delete Appointment successfully");
            response.setStatus(GlobalConstant.SUCCESS);
            response.setCode(GlobalConstant.CODE);
            response.setData(null);
            return response;

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public PaginatedResponse<AppointmentResponeList> searchAppointments(int page, int size, Long doctorId,
            String doctorName, String patientName, String sortBy, String sortDir) {
        try {
            Pageable pageable = PageUtil.getPageable(page, size, sortBy, sortDir);
            return appointmentCriteria.searchAppointments(doctorId, doctorName, patientName, pageable);

        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public BaseResponse<AppointmentRespone> getOneAppointment(long apptId) {
        BaseResponse<AppointmentRespone> response = new BaseResponse<>();
        try {
            AppointmentRespone appointmentRespone = new AppointmentRespone();
            Appointment appointment = appointmentRepository.findById(apptId)
                    .orElseThrow(() -> new ResourceNotFoundException("Appointment Not Found Id=" + apptId,
                            HttpStatus.NOT_FOUND));
            appointmentRespone.setApptId(apptId);
            appointmentRespone.setDoctorId(appointment.getDoctor().getDoctorId());
            appointmentRespone.setPatientId(appointment.getPatient().getPatientId());
            appointmentRespone.setScheduledOn(appointment.getScheduledOn());
            response.setMessage("Get Appointment successfully");
            response.setStatus(GlobalConstant.SUCCESS);
            response.setCode(GlobalConstant.CODE);
            response.setData(appointmentRespone);
            return response;
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public PaginatedResponse<AppointmentResponeList> specificationAppointments(int page, int size, Long doctorId,
            String doctorName, String patientName, String sortBy, String sortDir) {
        try {
            Specification<Appointment> spec = AppointmentSpecification.hasDoctorId(doctorId)
                    .and(AppointmentSpecification.hasDoctorName(doctorName))
                    .and(AppointmentSpecification.hasPatientName(patientName));
            Pageable pageable = PageUtil.getPageable(page, size, sortBy, sortDir);
            Page<Appointment> appointmentPage = appointmentRepository.findAll(spec, pageable);

            List<AppointmentResponeList> responseList = appointmentPage.getContent().stream()
                    .map(a -> new AppointmentResponeList(
                            a.getApptId(),
                            a.getScheduledOn(),
                            DateTimeUtil.getDatePart(a.getScheduledOn()),
                            DateTimeUtil.getTimePart(a.getScheduledOn()),
                            a.getDoctor().getDoctorId(),
                            a.getDoctor().getLastName() + " " + a.getDoctor().getFirstName(),
                            a.getPatient().getPatientId(),
                            a.getPatient().getLastName() + " " + a.getPatient().getFirstName()))
                    .toList();
            return new PaginatedResponse<>(
                    appointmentPage.getTotalElements(), // totalItems
                    responseList, // data
                    appointmentPage.getTotalPages(), // totalPages
                    appointmentPage.getNumber(), // currentPage (0-based)
                    appointmentPage.getSize(), // pageSize
                    appointmentPage.getNumberOfElements(), // numberOfItems on current page
                    appointmentPage.isFirst(), // first
                    appointmentPage.isLast(), // last
                    appointmentPage.isEmpty() // empty
            );

        } catch (Exception e) {
            throw e;
        }
    }
}
