package com.service;

import com.dto.request.LoginRequest;
import com.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse login(LoginRequest request);
    boolean canPMAccessProject(String informationId, String projectId);
    boolean isAdmin(String email);
}
