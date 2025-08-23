package com.hospital.management.api.features.hospitalmanagement.service;

import java.util.Optional;

import com.hospital.management.api.features.hospitalmanagement.entity.User;

public interface UserService {
	Optional<User> findUserByEmail(String username);
}