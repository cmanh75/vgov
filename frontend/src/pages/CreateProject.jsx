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

    const onCancel = () => {
        navigate('/projects');
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const projectData = {
            id: project.id,
            name: project.name,
            type: project.type,
            emailPm: project.emailPm,
            startDate: project.startDate,
            endDate: project.endDate,
            description: project.description,
            status: project.status
        };
        const create = async () => {
            try {
                const response = await createProject(projectData, token);
                setSuccess('Tạo dự án thành công!');
                setTimeout(() => {
                    navigate(`/projects/${project.id}`);
                }, 1000);
            } catch (error) {
                console.error('Lỗi khi tạo dự án:', error);
            }
        }
        create();
    };
    
    return (
        <UpdateProject
            project={project}
            handleChange={handleChange}
            error={error}
            success={success}
            isEdit={false}
            handleCreate={handleCreate}
            onCancel={onCancel}
        />
    );
}

export default CreateProject;

