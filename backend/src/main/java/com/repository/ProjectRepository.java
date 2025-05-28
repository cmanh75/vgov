package com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, String> {
    Optional<Project> findById(String id);
}
