package com.hospital.management.api.core.filter;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.hospital.management.api.core.exceptions.ResourceNotFoundException;
import com.hospital.management.api.core.security.CustomUserDetail;
import com.hospital.management.api.core.security.OurUserDetailsService;
@Component

public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final OurUserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    // Inject both the UserDetailsService and the PasswordEncoder
    public CustomAuthenticationProvider(OurUserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        // 1. Retrieve user details. The service itself should throw UsernameNotFoundException.
        //    There's no need for a null check here.
        CustomUserDetail userDetails = userDetailsService.loadUserByUsername(username);

        // 2. Validate credentials using the PasswordEncoder.
        //    This securely compares the raw password with the stored hashed password.
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            //throw new BadCredentialsException("Invalid credentials provided.");
            throw new ResourceNotFoundException("Please Check your Email Or Password",HttpStatus.UNAUTHORIZED);
        }

        // 3. Create a fully authenticated Authentication object.
        //    Use the 3-argument constructor and pass 'null' for the credentials to clear them.
        return new UsernamePasswordAuthenticationToken(
                userDetails,
                null, // Clear credentials for security
                userDetails.getAuthorities()
        );
    }

    @Override
    public boolean supports(Class<?> authentication) {
        // Use isAssignableFrom for more robust type checking
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}