package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Builder;
import jakarta.persistence.Column;
import java.util.Date;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import jakarta.persistence.CascadeType;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Information {
    @Id
    private String id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "dob")
    private Date dob;
}
