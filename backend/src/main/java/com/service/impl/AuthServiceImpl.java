package com.service.impl;

import org.springframework.stereotype.Service;
import com.service.AuthService;
import lombok.RequiredArgsConstructor;
import com.dto.request.LoginRequest;
import com.entity.User;
import com.repository.UserRepository;
import com.dto.response.AuthResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.service.JwtService;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().toLowerCase())
            .orElseThrow(() -> new RuntimeException("User not found"));
        if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return AuthResponse.builder()
                .token(jwtService.generateToken(user))
                .build();
        }
        throw new RuntimeException("Invalid password");
    }
}
