package com.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestHeader;

import com.dto.request.ChangePasswordRequest;
import com.dto.request.ResetPasswordRequest;
import com.service.PasswordService;
import com.dto.response.ChangePasswordResponse;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/password")
public class PasswordController {
    private final PasswordService passwordService;

    @PostMapping("/change")
    public ChangePasswordResponse changePassword(@RequestBody ChangePasswordRequest request, @RequestHeader("Authorization") String token) {
        return passwordService.changePassword(request.getEmail(), request.getOldPassword(), request.getNewPassword(), token);
    }
    @PostMapping("/reset")
    public String resetPassword(@RequestBody ResetPasswordRequest request) {
        System.out.println("request: " + request.getEmail());
        return passwordService.resetPassword(request.getEmail());
    }
}
