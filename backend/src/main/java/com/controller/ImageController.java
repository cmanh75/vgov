package com.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import java.nio.file.Files;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/images")
public class ImageController {
    
    @PostMapping("/upload/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String uploadImage(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        try {
            String uploadDir = System.getProperty("user.dir") + "/images/";
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }
            String filePath = uploadDir + id + ".png";
            file.transferTo(new File(filePath));
            return "File uploaded successfully: " + filePath;
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload file: " + e.getMessage();
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<byte[]> getImage(@PathVariable String id) {
        String filePath = System.getProperty("user.dir") + "/images/" + id + ".jpg";
        System.out.println("Looking for file at: " + filePath);

        File file = new File(filePath);
        System.out.println("File exists: " + file.exists());
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }
        try {
            byte[] imageBytes = Files.readAllBytes(file.toPath());
            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(imageBytes);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new byte[0]);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteImage(@PathVariable String id) {
        String filePath = "images/" + id + ".jpg";
        File file = new File(filePath);
        if (!file.exists()) {
            return "File not found";
        }
        file.delete();
        return "File deleted successfully";
    }
}