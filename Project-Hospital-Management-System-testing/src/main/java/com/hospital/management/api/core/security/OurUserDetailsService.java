package com.hospital.management.api.core.security;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hospital.management.api.core.exceptions.ResourceNotFoundException;
import com.hospital.management.api.features.hospitalmanagement.entity.Permission;
import com.hospital.management.api.features.hospitalmanagement.entity.Role;
import com.hospital.management.api.features.hospitalmanagement.entity.User;
import com.hospital.management.api.features.hospitalmanagement.repository.RoleRepository;
import com.hospital.management.api.features.hospitalmanagement.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class OurUserDetailsService implements UserDetailsService {
    private final UserService userService;
    private final RoleRepository roleRepository;

    @Override
    public CustomUserDetail loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.customUserDetail(username);
    }

    private CustomUserDetail customUserDetail(String username) {
        Optional<User> userByEmail = userService.findUserByEmail(username);
        if (userByEmail.isEmpty()) {
            throw new ResourceNotFoundException("User Not Found :"+username, HttpStatus.NOT_FOUND);
        }
        Optional<Role> roles = roleRepository.findById(userByEmail.get().getRoleId());

        return new CustomUserDetail(
                userByEmail.get().getEmail(),
                userByEmail.get().getPassword(), getAuthorities(roles.get()),
                userByEmail.get().getFirstName(),
                userByEmail.get().getLastName(),
                userByEmail.get().getGender(),
                roles.get().getName()
                );
    }

    public Set<SimpleGrantedAuthority> getAuthorities(Role role) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
        //authorities.add(new SimpleGrantedAuthority(role.getName()));

        for (Permission permission : role.getPermissions()) {
            authorities.add(new SimpleGrantedAuthority(permission.getName()));
        }

        return authorities;
    }

}
