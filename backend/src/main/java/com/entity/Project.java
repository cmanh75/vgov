package com.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import jakarta.persistence.Column;
import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Project {
    @Id
    private String id;

    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "email_pm", nullable = false)
    private String emailPm;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    private Date endDate;

    @Column(name = "type", nullable = false)
    private String type;
    
    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "description")
    private String description;

}