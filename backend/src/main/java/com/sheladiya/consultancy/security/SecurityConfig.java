package com.sheladiya.consultancy.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
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

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationEntryPoint unauthorizedHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationEntryPoint unauthorizedHandler,
                          JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.unauthorizedHandler = unauthorizedHandler;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        // CORS Preflight Requests: Unconditionally permit all OPTIONS requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Public client-facing form submissions & inquiries (all routing prefixes)
                        .requestMatchers(HttpMethod.POST, 
                                "/api/v1/contact", "/api/contact", "/contact",
                                "/api/v1/contacts", "/api/contacts", "/contacts",
                                "/api/v1/consultations", "/api/consultations", "/consultations",
                                "/api/v1/consultation", "/api/consultation", "/consultation",
                                "/api/v1/appointments", "/api/appointments", "/appointments",
                                "/api/v1/appointment", "/api/appointment", "/appointment"
                        ).permitAll()

                        // Public informational & status lookup endpoints
                        .requestMatchers(HttpMethod.GET,
                                "/api/v1/contact", "/api/contact", "/contact",
                                "/api/v1/contacts", "/api/contacts", "/contacts",
                                "/api/v1/consultations", "/api/consultations", "/consultations",
                                "/api/v1/consultation", "/api/consultation", "/consultation",
                                "/api/v1/consultations/reference/**", "/api/consultations/reference/**", "/consultations/reference/**",
                                "/api/v1/appointments/**", "/api/appointments/**", "/appointments/**",
                                "/api/v1/health", "/api/health", "/health"
                        ).permitAll()

                        // Public authentication
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/login", "/api/auth/login", "/auth/login").permitAll()

                        // Protected management & admin endpoints
                        .requestMatchers("/api/v1/admin/**", "/api/admin/**", "/admin/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers("/api/v1/auth/me", "/api/auth/me", "/auth/me").authenticated()
                        
                        // Any other request requires authentication
                        .anyRequest().authenticated()
                );

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
