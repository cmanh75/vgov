package com.model;

import lombok.Builder;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.Date;
import com.entity.Information;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InformationModel {
    private String id;
    private String name;
    private String email;
    private String role;
    private String gender;
    private Date dob;
    private String projectId;

    public static InformationModel toInformationModel(Information information) {
        return InformationModel.builder()
            .id(information.getId())
            .name(information.getName())
            .email(information.getEmail())
            .role(information.getRole())
            .gender(information.getGender())
            .dob(information.getDob())
            .projectId(information.getProjectId())
            .build();
    }
    
}  