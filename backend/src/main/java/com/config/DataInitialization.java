package com.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import com.entity.User;
import com.entity.Information;
import com.repository.UserRepository;
import com.repository.InformationRepository;
import java.util.Date;
import java.time.LocalDate;
import java.time.ZoneOffset;

@Configuration
public class DataInitialization {
    
    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, 
                                 InformationRepository informationRepository,
                                 PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("npcm752004t2k29@gmail.com").isEmpty()) {
                User adminUser = User.builder()
                    .email("npcm752004t2k29@gmail.com")
                    .password(passwordEncoder.encode("admin123"))
                    .build();

                Information adminInfo = Information.builder()
                    .id("ADMIN_001")
                    .name("Nguyen Phi Cuong Manh")
                    .email("npcm752004t2k29@gmail.com")
                    .role("ADMIN")
                    .gender("Male")
                    .dob(Date.from(LocalDate.of(2004, 5, 7).atStartOfDay().toInstant(ZoneOffset.UTC)))
                    .user(adminUser)
                    .build();

                adminUser.setInformation(adminInfo);
                informationRepository.save(adminInfo);
            }
        };
    }
}
