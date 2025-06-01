import React, { useState } from 'react';
import './css/CreateProject.css';
import { useNavigate } from 'react-router-dom';
import UpdateProject from './UpdateProject';
import { createProject } from '../api/projectApi';

const CreateProject = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [project, setProject] = useState({
        id: '',
        name: '',
        emailPm: '',
        description: '',
        status: '',
        startDate: '',
        endDate: '',
        status: '',
        type: '',
    });
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProject(project);
            setSuccess('Project created successfully');
            navigate('/projects');
        } catch (error) {
            setError('Failed to create project');
        }
    };

    const onCancel = () => {
        navigate('/projects');
    };

    const handleUpdate = () => {
        const updatedProject = {
            name: project.name,
            type: project.type,
            emailPm: project.emailPm,
            startDate: project.startDate,
            endDate: project.endDate,
            description: project.description,
            status: project.status
        };
        const updateProject = async () => {
            try {
                await createProject(updatedProject, token);
                navigate(`/projects/edit/${project.id}`);
            } catch (error) {
                console.error('Lỗi khi cập nhật dự án:', error);
            }
        }
        updateProject();
    };
    
    return (
        <UpdateProject
            project={project}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            success={success}
            isEdit={false}
            onCancel={onCancel}
            handleUpdate={handleUpdate}
        />
    );
}

export default CreateProject;

