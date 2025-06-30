package com.service;

import org.springframework.stereotype.Service;

@Service
public interface MailService {
    public void sendMail(String to, String subject, String text);
}
