package com.sheladiya.consultancy.service.impl;

import com.sheladiya.consultancy.dto.request.LoginRequestDto;
import com.sheladiya.consultancy.dto.response.AuthResponseDto;
import com.sheladiya.consultancy.entity.AdminUser;
import com.sheladiya.consultancy.exception.ResourceNotFoundException;
import com.sheladiya.consultancy.repository.AdminUserRepository;
import com.sheladiya.consultancy.security.JwtTokenProvider;
import com.sheladiya.consultancy.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final AdminUserRepository adminUserRepository;

    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           JwtTokenProvider tokenProvider,
                           AdminUserRepository adminUserRepository) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.adminUserRepository = adminUserRepository;
    }

    @Override
    public AuthResponseDto login(LoginRequestDto loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername().trim(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        AdminUser user = adminUserRepository.findByUsername(loginRequest.getUsername().trim())
                .or(() -> adminUserRepository.findByEmail(loginRequest.getUsername().trim()))
                .orElseThrow(() -> new ResourceNotFoundException("AdminUser", "username", loginRequest.getUsername()));

        return new AuthResponseDto(
                token,
                tokenProvider.getJwtExpirationMs(),
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );
    }

    @Override
    public AuthResponseDto getCurrentUser(String username) {
        AdminUser user = adminUserRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("AdminUser", "username", username));

        return new AuthResponseDto(
                null,
                tokenProvider.getJwtExpirationMs(),
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );
    }
}
