package com.dto.request;

import lombok.Data;
import java.util.Date;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InformationRequest {
    private String id;
    private String name;
    private String email;
    private String role;
    private String gender;
    private Date dob;
    private String projectId;
}
