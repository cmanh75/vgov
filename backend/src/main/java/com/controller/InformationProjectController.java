package com.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dto.request.InformationProjectRequest;
import com.dto.request.ProjectInformationRequest;
import com.service.InformationProjectService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/information-project")
@RequiredArgsConstructor
public class InformationProjectController {
    private final InformationProjectService informationProjectService;

    @PostMapping("/information")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> addProjectByInformationId(@RequestBody InformationProjectRequest request) {
        informationProjectService.addProjectByInformationId(request.getInformationId(), request.getProjectIds());
        return ResponseEntity.ok("Projects added successfully");
    }

    @PostMapping("/project")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> addInformationByProjectId(@RequestBody ProjectInformationRequest request) {
        informationProjectService.addInformationByProjectId(request.getProjectId(), request.getInformationIds());
        return ResponseEntity.ok("Informations added successfully");
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> addInformationProject(@RequestBody List<ProjectInformationRequest> request) {
        for (ProjectInformationRequest projectInformationRequest : request) {
            informationProjectService.addInformationByProjectId(projectInformationRequest.getProjectId(), projectInformationRequest.getInformationIds());
        }
        return ResponseEntity.ok("Information and project added successfully");
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteAllByProjectId(@RequestParam(required = false) String projectId, @RequestParam(required = false) String informationId) {
        System.out.println("projectId: " + projectId);
        System.out.println("informationId: " + informationId);
        if (projectId != null && informationId != null) {
            informationProjectService.deleteByInformationIdAndProjectId(informationId, projectId);
        } else if (projectId != null) {
            informationProjectService.deleteAllByProjectId(projectId);
        } else if (informationId != null) {
            informationProjectService.deleteAllByInformationId(informationId);
        }
        else {
            informationProjectService.deleteAll();
        }
        return ResponseEntity.ok("Projects deleted successfully");
    }
}
