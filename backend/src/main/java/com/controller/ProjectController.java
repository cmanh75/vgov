package com.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.service.ProjectService;
import com.entity.Project;
import com.dto.request.ProjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.HttpStatus;
import com.service.AuthService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.context.SecurityContextHolder;


@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    private final AuthService authService;

    public String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return userDetails.getUsername();
        }
        return null;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Project> addProject(@RequestBody ProjectRequest request) {
        Project project = projectService.addProject(request);
        return ResponseEntity.ok(project);
    }

    @PostMapping("/batch")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Project>> addManyProject(@RequestBody List<ProjectRequest> requests) {
        List<Project> projects = projectService.addManyProject(requests);
        return ResponseEntity.ok(projects);
    }

    @DeleteMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Project>> deleteAllProject() {
        List<Project> projects = projectService.deleteAllProject();
        return ResponseEntity.ok(projects);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Project> updateProject(@PathVariable String id, @RequestBody ProjectRequest request) {
        Project project = projectService.updateProject(request);
        return ResponseEntity.ok(project);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Project> deleteProject(@PathVariable String id) {
        Project project = projectService.deleteProject(id);
        return ResponseEntity.ok(project);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'PM')")
    public ResponseEntity<Project> getProjectById(@PathVariable String id, @RequestParam(required = false) String informationId) {
        if (authService.isAdmin(getCurrentUsername()) || authService.canPMAccessProject(informationId, id)) {
            return ResponseEntity.ok(projectService.getProjectById(id));
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') || (hasRole('PM') && #informationId != null && authentication.principal.information.id == #informationId)")
    public ResponseEntity<List<Project>> getAllProjects(@RequestParam(required = false) String informationId) {
        if (authService.isAdmin(getCurrentUsername()) && informationId == null) {
            List<Project> projects = projectService.getAllProjects();
            return ResponseEntity.ok(projects);
        }
        List<Project> projects = projectService.getProjectByInformationId(informationId);
        return ResponseEntity.ok(projects);
    }
}