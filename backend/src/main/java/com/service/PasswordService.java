package com.service;

import org.springframework.stereotype.Service;
import com.dto.response.ChangePasswordResponse;

@Service
public interface PasswordService {
    public ChangePasswordResponse changePassword(String email, String oldPassword, String newPassword, String token);
    public String resetPassword(String email);
}
