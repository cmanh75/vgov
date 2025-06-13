package com.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.dto.request.InformationRequest;
import com.service.InformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import com.model.InformationModel;
import org.springframework.security.access.prepost.PreAuthorize;
import com.service.InformationProjectService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestHeader;
import com.dto.response.AllUserResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/information")
public class InformationController {
    private final InformationService informationService;
    private final InformationProjectService informationProjectService;

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
    public ResponseEntity<String> addInformation(@RequestBody InformationRequest request) {
        String information = informationService.addInformation(request);    
        return ResponseEntity.ok(information);
    }

    @PostMapping("/batch")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<String>> addManyInformation(@RequestBody List<InformationRequest> requests) {
        List<String> information = informationService.addManyInformation(requests);
        return ResponseEntity.ok(information);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InformationModel> updateInformation(@PathVariable String id, @RequestBody InformationRequest request) {
        InformationModel information = informationService.updateInformation(id, request);
        return ResponseEntity.ok(information);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<InformationModel> getInformation(@PathVariable String id, @RequestHeader("Authorization") String token) {
        InformationModel information = informationService.getInformation(id, token);
        return ResponseEntity.ok(information);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','PM')")
    public ResponseEntity<AllUserResponse> getAllInformation(@RequestHeader("Authorization") String token, @RequestParam(required = false) String projectId, @RequestParam(required = true) String querySearch, @RequestParam(required = true) String roleFilter, @RequestParam(required = true) String page) {
        AllUserResponse allUserResponse = informationService.getAllInformation(token, projectId, querySearch, roleFilter, page);
        return ResponseEntity.ok(allUserResponse);
    }

    @GetMapping("/statistic")
    @PreAuthorize("hasAnyRole('ADMIN','PM')")
    public ResponseEntity<List<InformationModel>> getInformationStatistic(@RequestParam(required = false) String projectId) {
        System.out.println("projectId: " + projectId);
        List<InformationModel> information = informationService.getInformationStatistic(projectId);
        return ResponseEntity.ok(information);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteInformation(@PathVariable String id) {
        informationProjectService.deleteAllByInformationId(id);
        informationService.deleteInformation(id);
        return ResponseEntity.ok("Information deleted successfully");
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteAllInformation() {
        informationService.deleteAllInformation();
        return ResponseEntity.ok("All information deleted successfully");
    }
}
