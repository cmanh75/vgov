package com.service.impl;

import org.springframework.stereotype.Service;
import com.service.InformationService;
import com.entity.Information;
import lombok.RequiredArgsConstructor;
import com.dto.request.InformationRequest;
import com.repository.InformationRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;
import com.entity.User;
import com.model.InformationModel;
import com.util.RandomPassword;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InformationServiceImpl implements InformationService {
    private final InformationRepository informationRepository;
    private final PasswordEncoder passwordEncoder;
    private final RandomPassword randomPassword;

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
            .projectId(request.getProjectId())
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
        information.setProjectId(request.getProjectId());
        return InformationModel.toInformationModel(informationRepository.save(information));
    }

    @Override
    public InformationModel getInformationByEmail(String email) {
        Information information = informationRepository.findByEmailContainingIgnoreCase(email)
            .orElseThrow(() -> new RuntimeException("Information not found"));
        return InformationModel.toInformationModel(information);
    }
    @Override
    public InformationModel getInformation(String id) {
        Information information = informationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Information not found"));
        return InformationModel.toInformationModel(information);
    }

    @Override
    public void deleteInformation(String id) {
        informationRepository.deleteById(id);
    }

    @Override
    public List<InformationModel> getAllInformation() {
        List<Information> information = informationRepository.findAll();
        return information.stream()
            .map(InformationModel::toInformationModel)
            .collect(Collectors.toList());
    }

    @Override
    public List<InformationModel> getAllInformationByProjectId(String projectId) {
        List<Information> information = informationRepository.findAllByProjectId(projectId);
        return information.stream()
            .map(InformationModel::toInformationModel)
            .collect(Collectors.toList());
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
