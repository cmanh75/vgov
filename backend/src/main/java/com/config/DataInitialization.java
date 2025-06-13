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
                    .gender("MALE")
                    .dob(Date.from(LocalDate.of(2004, 5, 7).atStartOfDay().toInstant(ZoneOffset.UTC)))
                    .user(adminUser)
                    .build();

                adminUser.setInformation(adminInfo);
                informationRepository.save(adminInfo);
            }
            if (userRepository.findByEmail("duonghaianh@gmail.com").isEmpty()) {
                User pmUser = User.builder()
                    .email("duonghaianh@gmail.com")
                    .password(passwordEncoder.encode("duonghaianh"))
                    .build();

                Information pmInfo = Information.builder()
                    .id("USER_200")
                    .name("Duong Hai Anh")
                    .email("duonghaianh@gmail.com")
                    .role("PM")
                    .gender("MALE")
                    .dob(Date.from(LocalDate.of(2004, 6, 7).atStartOfDay().toInstant(ZoneOffset.UTC)))
                    .user(pmUser)
                    .build();

                pmUser.setInformation(pmInfo);
                informationRepository.save(pmInfo);
            }
            if (userRepository.findByEmail("trankhachongduc@gmail.com").isEmpty()) {
                User devUser = User.builder()
                    .email("trankhachongduc@gmail.com")
                    .password(passwordEncoder.encode("trankhachongduc"))
                    .build();

                Information devInfo = Information.builder()
                    .id("USER_201")
                    .name("Tran Khac Hoc Duc")
                    .email("trankhachongduc@gmail.com")
                    .role("DEV")
                    .gender("MALE")
                    .dob(Date.from(LocalDate.of(2004, 4, 15).atStartOfDay().toInstant(ZoneOffset.UTC)))
                    .user(devUser)
                    .build();

                devUser.setInformation(devInfo);
                informationRepository.save(devInfo);
            }
        };
    }
}
