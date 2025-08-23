package com.hospital.management.api.core.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hospital.management.api.core.filter.CustomAuthenticationProvider;
import com.hospital.management.api.core.filter.JWTAuthFIlter;
import com.hospital.management.api.core.security.CustomAccessDeniedHandler;
import com.hospital.management.api.core.security.CustomAuthenticationEntryPoint;
import com.hospital.management.api.core.security.OurUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class SecurityConfig {

    private OurUserDetailsService ourUserDetailsService;
    private JWTAuthFIlter jwtAuthFIlter;
    private  ObjectMapper objectMapper;

    public SecurityConfig(OurUserDetailsService ourUserDetailsService, JWTAuthFIlter jwtAuthFIlter,
            ObjectMapper objectMapper) {
        this.ourUserDetailsService = ourUserDetailsService;
        this.jwtAuthFIlter = jwtAuthFIlter;
        this.objectMapper = objectMapper;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(request -> request
                .requestMatchers("/auth/**", "/public/**").permitAll()
                         .requestMatchers("/admin/**").hasRole("USER")
                       // .requestMatchers("/admin/**").hasAnyAuthority("ADMIN")
                    //    //  .requestMatchers("/user/**","patient/v1/**").hasAnyAuthority("USER")
                    //   .requestMatchers("/v1/patient/**").hasAnyAuthority("USER")
                    //   //  .requestMatchers("/user/**","patient/v1/**").hasAnyAuthority("READ_PRIVILEGE")
                    //     .requestMatchers("/adminuser/**").hasAnyAuthority("USER", "ADMIN")
                        .anyRequest().authenticated()
                        )
                        .exceptionHandling(ex -> ex
            .authenticationEntryPoint(new CustomAuthenticationEntryPoint(objectMapper))
            .accessDeniedHandler(new CustomAccessDeniedHandler(objectMapper))
        )
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(
                        jwtAuthFIlter, UsernamePasswordAuthenticationFilter.class
                );
        return httpSecurity.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        return new CustomAuthenticationProvider(ourUserDetailsService, passwordEncoder());
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}