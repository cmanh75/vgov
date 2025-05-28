package com.config;

import com.entity.User;
import com.entity.Information;
import com.repository.UserRepository;
import com.repository.InformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InformationRepository informationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("npcm752004t2k29@gmail.com").isEmpty()) {
            User admin = User.builder()
                .email("npcm752004t2k29@gmail.com")
                .password(passwordEncoder.encode("admin123"))
                .build();

            Information adminInfo = Information.builder()
                .id("ADMIN_001")
                .name("Manh Nguyen")
                .email("npcm752004t2k29@gmail.com")
                .role("ADMIN")
                .gender("MALE")
                .dob(new Date())
                .projectId("PRJ_001")
                .user(admin)
                .build();
            admin.setInformation(adminInfo);
            informationRepository.save(adminInfo);
        }
    }
} 