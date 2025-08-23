package com.hospital.management.api.features.hospitalmanagement.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.management.api.features.hospitalmanagement.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
	// @Query("SELECT u FROM User u JOIN FETCH u.roles r JOIN FETCH r.permissions WHERE u.email = :email")
    // Optional<User> findByEmailWithRoles(@Param("email") String email);
}