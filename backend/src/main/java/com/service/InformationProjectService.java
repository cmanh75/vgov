package com.service;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface InformationProjectService {
    public void addProjectByInformationId(String informationId, List<String> projectId);
    public void addInformationByProjectId(String projectId, List<String> informationId);
    public void deleteAllByInformationId(String informationId);
    public void deleteAllByProjectId(String projectId);
    public void deleteByInformationIdAndProjectId(String informationId, String projectId);
    public void deleteAll();
}
