package com.sheladiya.consultancy.service;

import com.sheladiya.consultancy.dto.request.LoginRequestDto;
import com.sheladiya.consultancy.dto.response.AuthResponseDto;

public interface AuthService {
    AuthResponseDto login(LoginRequestDto loginRequest);
    AuthResponseDto getCurrentUser(String username);
}
