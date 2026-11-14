package com.sheladiya.consultancy.controller;

import com.sheladiya.consultancy.dto.request.LoginRequestDto;
import com.sheladiya.consultancy.dto.response.ApiResponse;
import com.sheladiya.consultancy.dto.response.AuthResponseDto;
import com.sheladiya.consultancy.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Admin login to acquire JWT bearer token.
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponseDto>> login(@Valid @RequestBody LoginRequestDto loginRequest) {
        AuthResponseDto response = authService.login(loginRequest);
        return ResponseEntity.ok(ApiResponse.ok("Login successful", response));
    }

    /**
     * Verify authenticated user details.
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<AuthResponseDto>> me(@AuthenticationPrincipal UserDetails userDetails) {
        AuthResponseDto response = authService.getCurrentUser(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(response));
    }
}
