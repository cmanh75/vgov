package com.service.impl;

import org.springframework.stereotype.Service;
import com.service.InformationService;
import com.entity.Information;
import com.entity.InformationProject;
import lombok.RequiredArgsConstructor;
import com.dto.request.InformationRequest;
import com.repository.InformationProjectRepository;
import com.repository.InformationRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;
import com.entity.User;
import com.model.InformationModel;
import com.util.RandomPassword;
import java.util.stream.Collectors;
import com.service.AuthService;
import com.service.JwtService;
import com.repository.UserRepository;
import com.entity.Project;
import java.util.ArrayList;
import com.dto.response.AllUserResponse;

@Service
@RequiredArgsConstructor
public class InformationServiceImpl implements InformationService {
    private final InformationRepository informationRepository;
    private final PasswordEncoder passwordEncoder;
    private final RandomPassword randomPassword;
    private final InformationProjectRepository informationProjectRepository;
    private final JwtService jwtService;
    private final AuthService authService;
    private final UserRepository userRepository;
    @Override
    public String addInformation(InformationRequest request) {
        String password = randomPassword.generateRandomPassword(10);
        User user = User.builder()
            .email(request.getEmail())
            .password(passwordEncoder.encode(password))
            .build();
        Information information = Information.builder()
            .id(request.getId())
            .name(request.getName())
            .email(request.getEmail())
            .role(request.getRole())
            .gender(request.getGender())
            .dob(request.getDob())
            .user(user)
            .build();
        user.setInformation(information);
        informationRepository.save(information);
        return password;
    }

    @Override
    public InformationModel updateInformation(String id, InformationRequest request) {
        Information information = informationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Information not found"));
        information.setEmail(request.getEmail());
        information.setName(request.getName());
        information.setRole(request.getRole());
        information.setGender(request.getGender());
        information.setDob(request.getDob());
        return InformationModel.toInformationModel(informationRepository.save(information));
    }

    @Override
    public InformationModel getInformationByEmail(String email) {
        Information information = informationRepository.findByEmailContainingIgnoreCase(email)
            .orElseThrow(() -> new RuntimeException("Information not found"));
        return InformationModel.toInformationModel(information);
    }
    @Override
    public InformationModel getInformation(String id, String token) {
        User user = userRepository.findByEmail(jwtService.extractUsername(token))
            .orElseThrow(() -> new RuntimeException("User not found"));
        String role = user.getInformation().getRole();
        String informationId = user.getInformation().getId();
        if (role.equals("ADMIN") || informationId.equals(id)) {
            Information information = informationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Information not found"));
            return InformationModel.toInformationModel(information);
        }
        if (role.equals("PM")) {
            List<InformationProject> informationProjects = informationProjectRepository.findAllByInformationId(informationId);
            List<String> projectIds = informationProjects.stream()
                .map(InformationProject::getProject)
                .map(Project::getId)
                .collect(Collectors.toList());
            for (String projectId : projectIds) {
                List<InformationProject> projectInformation = informationProjectRepository.findAllByProjectId(projectId);
                if (projectInformation.stream().anyMatch(informationProject -> informationProject.getInformation().getId().equals(id))) {
                    Information information = informationRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Information not found"));
                    return InformationModel.toInformationModel(information);
                }
            }
        }
        return null;
    }

    @Override
    public void deleteInformation(String id) {
        informationRepository.deleteById(id);
    }

    @Override
    public AllUserResponse getAllInformation(String token, String projectId, String querySearch, String roleFilter, String page) {
        User user = userRepository.findByEmail(jwtService.extractUsername(token))
            .orElseThrow(() -> new RuntimeException("User not found"));
        String role = user.getInformation().getRole();
        String fquerySearch = querySearch.replaceAll("%20", " ");
        String informationId = user.getInformation().getId();
        if (role.equals("ADMIN") || (role.equals("PM") && authService.canPMAccessProject(informationId, projectId))) {
            List<Information> informations = new ArrayList<>();
            if (projectId != null) {
                List<InformationProject> informationProjects = informationProjectRepository.findAllByProjectId(projectId);
                informations = informationProjects.stream()
                    .map(InformationProject::getInformation)
                    .collect(Collectors.toList());
            }
            else {
                informations = informationRepository.findAll();
            }
            informations = informations.stream()
                .filter(information -> information.getName().contains(fquerySearch) || information.getEmail().contains(fquerySearch))
                .collect(Collectors.toList());
            if (!roleFilter.equals("all")) {
                informations = informations.stream()
                    .filter(information -> information.getRole().equals(roleFilter))
                    .collect(Collectors.toList());
            }
            int totalUsers = informations.size();
            informations = informations.stream()
                .skip((Integer.parseInt(page) - 1) * 6)
                .limit(6)
                .collect(Collectors.toList());
            return AllUserResponse.builder()
                .informations(informations.stream()
                    .map(InformationModel::toInformationModel)
                    .collect(Collectors.toList()))
                .totalUsers(totalUsers)
                .build();
        }
        return AllUserResponse.builder()
            .informations(new ArrayList<>())
            .totalUsers(0)
            .build();
    }

    @Override
    public List<InformationModel> getAllInformationByProjectId(String projectId) {
        List<InformationProject> information = informationProjectRepository.findAllByProjectId(projectId);
        return information.stream()
            .map(InformationProject::getInformation)
            .map(InformationModel::toInformationModel)
            .collect(Collectors.toList());
    }

    @Override
    public List<InformationModel> getInformationStatistic(String projectId) {
        if (projectId == null) {
            return informationRepository.findAll().stream()
                .map(InformationModel::toInformationModel)
                .collect(Collectors.toList());
        }   
        return getAllInformationByProjectId(projectId);
    }

    @Override
    public List<String> addManyInformation(List<InformationRequest> requests) {
        List<String> passwords = requests.stream()
            .map(this::addInformation)
            .collect(Collectors.toList());
        return passwords;
    }

    @Override
    public List<Information> deleteAllInformation() {
        List<Information> informations = informationRepository.findAll();
        informationRepository.deleteAll(informations);
        return informations;
    }
}
