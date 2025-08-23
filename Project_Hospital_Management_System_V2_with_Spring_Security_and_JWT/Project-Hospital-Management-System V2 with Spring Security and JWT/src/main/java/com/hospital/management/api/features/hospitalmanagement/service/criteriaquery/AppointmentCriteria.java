package com.hospital.management.api.features.hospitalmanagement.service.criteriaquery;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.hospital.management.api.features.hospitalmanagement.dto.response.AppointmentResponeList;
import com.hospital.management.api.features.hospitalmanagement.dto.response.PaginatedResponse;
import com.hospital.management.api.features.hospitalmanagement.entity.Appointment;
import com.hospital.management.api.features.hospitalmanagement.util.DateTimeUtil;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
@Service
public class AppointmentCriteria { 

    @PersistenceContext
    private EntityManager entityManager;

    public PaginatedResponse<AppointmentResponeList> searchAppointments(Long doctorId, String doctorName, String patientName, Pageable pageable) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        // 🌟 Main query setup
        CriteriaQuery<Appointment> query = cb.createQuery(Appointment.class);
        Root<Appointment> root = query.from(Appointment.class);
        Join<?, ?> doctor = root.join("doctor");
        Join<?, ?> patient = root.join("patient");

        List<Predicate> predicates = buildPredicates(cb, root, doctor, patient, doctorId, doctorName, patientName);
        query.where(predicates.toArray(new Predicate[0]));

        applySorting(cb, query, root, doctor, patient, pageable);

        // ⏳ Fetch paginated result
        TypedQuery<Appointment> typedQuery = entityManager.createQuery(query);
        typedQuery.setFirstResult((int) pageable.getOffset());
        typedQuery.setMaxResults(pageable.getPageSize());
        List<Appointment> appointments = typedQuery.getResultList();

        List<AppointmentResponeList> responses = appointments.stream()
            .map(a -> new AppointmentResponeList(
                a.getApptId(),
                a.getScheduledOn(),
                DateTimeUtil.getDatePart(a.getScheduledOn()),
               DateTimeUtil.getTimePart(a.getScheduledOn()),
                a.getDoctor().getDoctorId(),
                a.getDoctor().getLastName() + " " + a.getDoctor().getFirstName(),
                a.getPatient().getPatientId(),
                a.getPatient().getLastName() + " " + a.getPatient().getFirstName()
            ))
            .toList();

        // 🔍 Count query
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<Appointment> countRoot = countQuery.from(Appointment.class);
        Join<?, ?> countDoctor = countRoot.join("doctor");
        Join<?, ?> countPatient = countRoot.join("patient");

        List<Predicate> countPredicates = buildPredicates(cb, countRoot, countDoctor, countPatient, doctorId, doctorName, patientName);
        countQuery.select(cb.count(countRoot)).where(countPredicates.toArray(new Predicate[0]));

        Long totalItems = entityManager.createQuery(countQuery).getSingleResult();
        int totalPages = (int) Math.ceil((double) totalItems / pageable.getPageSize());
        int currentPage = pageable.getPageNumber();
        int pageSize = pageable.getPageSize();
        int numberOfItems = responses.size();
        boolean first = currentPage == 0;
        boolean last = (currentPage + 1) >= totalPages;
        boolean empty = responses.isEmpty();

        return new PaginatedResponse<>(
                totalItems,
                responses,
                totalPages,
                currentPage,
                pageSize,
                numberOfItems,
                first,
                last,
                empty
        );
    }

    // ✅ Filter builder
    private List<Predicate> buildPredicates(CriteriaBuilder cb, Root<Appointment> root,
                                            Join<?, ?> doctor, Join<?, ?> patient,
                                            Long doctorId, String doctorName, String patientName) {
        List<Predicate> predicates = new ArrayList<>();

        if (doctorId != null) {
            predicates.add(cb.equal(doctor.get("doctorId"), doctorId));
        }
        if (doctorName != null && !doctorName.isBlank()) {
            Expression<String> fullName = cb.concat(doctor.get("lastName"), cb.concat(" ", doctor.get("firstName")));
            predicates.add(cb.like(cb.lower(fullName), "%" + doctorName.toLowerCase() + "%"));
        }
        if (patientName != null && !patientName.isBlank()) {
            Expression<String> fullName = cb.concat(patient.get("lastName"), cb.concat(" ", patient.get("firstName")));
            predicates.add(cb.like(cb.lower(fullName), "%" + patientName.toLowerCase() + "%"));
        }

        return predicates;
    }

    // ✅ Sorting builder
    private void applySorting(CriteriaBuilder cb, CriteriaQuery<Appointment> query,
                              Root<Appointment> root, Join<?, ?> doctor, Join<?, ?> patient,
                              Pageable pageable) {

        if (!pageable.getSort().isEmpty()) {
            List<Order> orders = new ArrayList<>();
            for (Sort.Order sortOrder : pageable.getSort()) {
                String property = sortOrder.getProperty();
                Expression<?> expression;

                switch (property) {
                    case "scheduledOn":
                    case "date":
                    case "time":
                    case "apptId":
                        expression = root.get(property);
                        break;
                    case "doctorId":
                        expression = doctor.get("doctorId");
                        break;
                    case "doctor":
                        expression = cb.concat(doctor.get("lastName"), cb.concat(" ", doctor.get("firstName")));
                        break;
                    case "patientId":
                        expression = patient.get("patientId");
                        break;
                    case "patient":
                        expression = cb.concat(patient.get("lastName"), cb.concat(" ", patient.get("firstName")));
                        break;
                    default:
                        continue;
                }

                orders.add(sortOrder.isAscending() ? cb.asc(expression) : cb.desc(expression));
            }
            query.orderBy(orders);
        }
    }
}
