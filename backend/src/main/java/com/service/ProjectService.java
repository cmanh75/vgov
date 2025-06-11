package com.service;

import org.springframework.stereotype.Service;
import com.entity.Project;
import com.dto.request.ProjectRequest;
import java.util.List;

@Service
public interface ProjectService {
    public Project createProject(ProjectRequest request);
    public Project addProject(ProjectRequest request);
    public Project updateProject(ProjectRequest request);
    public Project deleteProject(String id);
    public Project getProjectById(String id, String token);
    public List<Project> getAllProjects(String token, String informationId);
    public List<Project> addManyProject(List<ProjectRequest> requests);
    public List<Project> deleteAllProject();
    public List<Project> getProjectByInformationId(String informationId);
}
