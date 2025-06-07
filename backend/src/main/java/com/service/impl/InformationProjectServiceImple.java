package com.service.impl;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import com.service.InformationProjectService;
import com.entity.InformationProject;
import com.entity.InformationProjectId;
import com.repository.InformationProjectRepository;
import com.repository.InformationRepository;
import com.repository.ProjectRepository;
import com.entity.Information;
import com.entity.Project;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InformationProjectServiceImple implements InformationProjectService {
    private final InformationProjectRepository informationProjectRepository;
    private final InformationRepository informationRepository;
    private final ProjectRepository projectRepository;
    @Override
    public void addProjectByInformationId(String informationId, List<String> projectIds) {
        for (String projectId : projectIds) {
            InformationProject informationProject = new InformationProject();
            Information information = informationRepository.findById(informationId).orElseThrow(() -> new RuntimeException("Information not found"));
            Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
            informationProject.setInformation(information);
            informationProject.setProject(project);
            informationProject.setId(new InformationProjectId(information.getId(), project.getId()));
            informationProjectRepository.save(informationProject);
        }
    }

    @Override
    public void addInformationByProjectId(String projectId, List<String> informationIds) {
        for (String informationId : informationIds) {
            InformationProject informationProject = new InformationProject();
            Information information = informationRepository.findById(informationId).orElseThrow(() -> new RuntimeException("Information not found"));
            Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
            informationProject.setInformation(information);
            informationProject.setProject(project);
            informationProject.setId(new InformationProjectId(information.getId(), project.getId()));
            informationProjectRepository.save(informationProject);
        }
    }

    @Transactional
    @Override
    public void deleteAllByInformationId(String informationId) {
        informationProjectRepository.deleteAllByInformationId(informationId);
    }

    @Transactional
    @Override
    public void deleteAllByProjectId(String projectId) {
        informationProjectRepository.deleteAllByProjectId(projectId);
    }

    @Transactional
    @Override
    public void deleteByInformationIdAndProjectId(String informationId, String projectId) {
        informationProjectRepository.deleteByInformationIdAndProjectId(informationId, projectId);
    }

    @Override
    public void deleteAll() {
        informationProjectRepository.deleteAll();
    }
}
