package com.hospital.management.api.features.hospitalmanagement.service.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hospital.management.api.features.hospitalmanagement.entity.User;
import com.hospital.management.api.features.hospitalmanagement.repository.UserRepository;
import com.hospital.management.api.features.hospitalmanagement.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {
  private final UserRepository userRepository;

  @Override
  public Optional<User> findUserByEmail(String email) {
    return userRepository.findByEmail(email);
    // return userRepository.findByEmailWithRoles(email);

  }

}
