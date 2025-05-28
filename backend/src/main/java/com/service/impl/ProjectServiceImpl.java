package com.service.impl;

import org.springframework.stereotype.Service;
import com.service.ProjectService;
import com.entity.Project;
import com.dto.request.ProjectRequest;
import com.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    @Override
    public Project createProject(ProjectRequest request) {
        Project project = Project.builder()
            .id(request.getId())
            .name(request.getName())
            .emailPm(request.getEmailPm())
            .description(request.getDescription())
            .status(request.getStatus())
            .type(request.getType())
            .startDate(request.getStartDate())
            .endDate(request.getEndDate())
            .build();
        return project;
    }

    @Override
    public Project addProject(ProjectRequest request) {
        Project project = createProject(request);
        return projectRepository.save(project);
    }

    @Override
    public Project updateProject(ProjectRequest request) {
        Project project = projectRepository.findById(request.getId())
            .orElseThrow(() -> new RuntimeException("Project not found"));
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        return projectRepository.save(project);
    }

    @Override
    public Project deleteProject(String id) {
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Project not found"));
        projectRepository.delete(project);
        return project;
    }
    
    @Override
    public Project getProjectById(String id) {
        return projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
}
