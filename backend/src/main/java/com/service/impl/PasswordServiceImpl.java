package com.service.impl;

import org.springframework.stereotype.Service;
import com.service.PasswordService;
import com.repository.UserRepository;
import com.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.service.MailService;
import lombok.RequiredArgsConstructor;
import com.util.RandomPassword;
import com.service.JwtService;
import com.dto.response.ChangePasswordResponse;

@RequiredArgsConstructor
@Service
public class PasswordServiceImpl implements PasswordService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final RandomPassword randomPassword;
    private final JwtService jwtService;
    @Override
    public ChangePasswordResponse changePassword(String email, String oldPassword, String newPassword, String token) {
        String decodedToken = jwtService.extractUsername(token);
        System.out.println("decodedToken: " + decodedToken);
        System.out.println("password: " + newPassword);
        if (!decodedToken.equals(email)) {
            throw new RuntimeException("Invalid token");
        }
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            ChangePasswordResponse response = new ChangePasswordResponse();
            response.setSuccess(false);
            response.setMessage("Không tìm thấy tài khoản");
            return response;
        }
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            ChangePasswordResponse response = new ChangePasswordResponse();
            response.setSuccess(false);
            response.setMessage("Mật khẩu cũ không chính xác");
            return response;
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        ChangePasswordResponse response = new ChangePasswordResponse();
        response.setSuccess(true);
        response.setMessage("Đổi mật khẩu thành công");
        return response;
    }

    @Override
    public String resetPassword(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        String newPassword = randomPassword.generateRandomPassword(10);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        mailService.sendMail(email, "Reset Password", "Your new password is: " + newPassword);
        return "Reset password email sent";
    }
}
