package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.entity.InformationProject;

public interface InformationProjectRepository extends JpaRepository<InformationProject, Long> {
    List<InformationProject> findAllByInformationId(String informationId);
    List<InformationProject> findAllByProjectId(String projectId);
    void deleteAllByInformationId(String informationId);
    void deleteAllByProjectId(String projectId);
    void deleteByInformationIdAndProjectId(String informationId, String projectId);
    boolean existsByInformationIdAndProjectId(String informationId, String projectId);
}
