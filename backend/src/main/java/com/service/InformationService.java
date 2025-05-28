package com.service;

import org.springframework.stereotype.Service;
import com.dto.request.InformationRequest;
import java.util.List;
import com.model.InformationModel;

@Service
public interface InformationService {
    public String addInformation(InformationRequest request);
    public InformationModel updateInformation(String id, InformationRequest request);
    public InformationModel getInformation(String id);
    public void deleteInformation(String id);
    public List<InformationModel> getAllInformation();
}
