package com.service;

import org.springframework.stereotype.Service;
import com.dto.request.InformationRequest;
import java.util.List;
import com.model.InformationModel;
import com.entity.Information;
import com.dto.response.AllUserResponse;

@Service
public interface InformationService {
    public String addInformation(InformationRequest request);
    public InformationModel updateInformation(String id, InformationRequest request);
    public InformationModel getInformation(String id, String token);
    public InformationModel getInformationByEmail(String email);
    public List<InformationModel> getAllInformationByProjectId(String projectId);
    public void deleteInformation(String id);
    public AllUserResponse getAllInformation(String token, String projectId, String querySearch, String roleFilter, String page);
    public List<String> addManyInformation(List<InformationRequest> requests);
    public List<Information> deleteAllInformation();
}
