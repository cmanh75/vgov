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
import com.model.InformationModel;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/information")
public class InformationController {
    private final InformationService informationService;

    @PostMapping
    public ResponseEntity<String> addInformation(@RequestBody InformationRequest request) {
        String information = informationService.addInformation(request);    
        return ResponseEntity.ok(information);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InformationModel> updateInformation(@PathVariable String id, @RequestBody InformationRequest request) {
        InformationModel information = informationService.updateInformation(id, request);
        return ResponseEntity.ok(information);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<InformationModel> getInformation(@PathVariable String id) {
        InformationModel information = informationService.getInformation(id);
        return ResponseEntity.ok(information);
    }

    @GetMapping
    public ResponseEntity<List<InformationModel>> getAllInformation() {
        List<InformationModel> information = informationService.getAllInformation();
        return ResponseEntity.ok(information);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInformation(@PathVariable String id) {
        informationService.deleteInformation(id);
        return ResponseEntity.ok("Information deleted successfully");
    }
}
