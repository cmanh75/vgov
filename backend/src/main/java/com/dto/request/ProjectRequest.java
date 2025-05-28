package com.dto.request;

import lombok.Data;
import java.util.Date;

@Data
public class ProjectRequest {
    private String id;
    private String name;  
    private String emailPm;
    private String type;
    private String description;
    private String status;
    private Date startDate;
    private Date endDate;
}