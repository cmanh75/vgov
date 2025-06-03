package com.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Information;

public interface InformationRepository extends JpaRepository<Information, String> {
    Optional<Information> findById(String id);
    Optional<Information> findByEmailContainingIgnoreCase(String email);
    List<Information> findAllByProjectId(String projectId);
}
