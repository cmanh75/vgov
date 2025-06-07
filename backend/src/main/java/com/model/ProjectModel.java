package com.model;

import java.util.Date;

import lombok.Builder;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import com.entity.Project;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectModel {
    private String id;
    private String name;
    private String emailPm;
    private Date startDate;
    private Date endDate;
    private String type;
    private String status;
}
