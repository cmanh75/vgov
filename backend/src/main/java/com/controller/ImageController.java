package com.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import java.io.File;
import java.io.IOException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import java.nio.file.Files;


@RestController
public class ImageController {
    @PostMapping("api/images/upload/{id}")
    public String uploadImage(@RequestParam("file") MultipartFile file, @PathVariable String id) {
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

    @GetMapping("api/images/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable String id) {
        String filePath = "images/" + id + ".png";
        File file = new File(filePath);
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
}