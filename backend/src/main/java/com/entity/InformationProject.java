package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.MapsId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InformationProject {
    @EmbeddedId
    private InformationProjectId id;

    @ManyToOne
    @MapsId("informationId")
    @JoinColumn(name = "information_id")
    private Information information;

    @ManyToOne
    @MapsId("projectId") 
    @JoinColumn(name = "project_id")
    private Project project;
}
