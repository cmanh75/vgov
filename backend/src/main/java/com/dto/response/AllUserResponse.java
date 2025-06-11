package com.dto.response;

import java.util.List;

import com.model.InformationModel;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AllUserResponse {
    private List<InformationModel> informations;
    private int totalUsers;
}
