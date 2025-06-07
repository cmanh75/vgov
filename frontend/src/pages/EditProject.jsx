import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, updateProject } from '../api/projectApi';
import UpdateProject from './UpdateProject';
import '../pages/css/EditProject.css';
import { formatDateWithOffset } from '../utils/formatDateDb';

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token = localStorage.getItem('token');

    const [project, setProject] = useState({
        name: '',
        description: '',
        emailPm: '',
        startDate: '',
        endDate: '',
        status: '',
        type: ''
    });

    const onCancel = () => {
        navigate('/projects');
    };

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const response = await getProjectById(id, token);
            if (response && response.data) {
                const projectData = response.data;
                setProject({
                    id: projectData.id || '',
                    name: projectData.name || '',
                    description: projectData.description || '',
                    emailPm: projectData.emailPm || '',
                    startDate: projectData.startDate ? new Date(projectData.startDate).toISOString().split('T')[0] : '',
                    endDate: projectData.endDate ? new Date(projectData.endDate).toISOString().split('T')[0] : '',
                    status: projectData.status || '',
                    type: projectData.type || ''
                });
            } else {
                setError('Không tìm thấy thông tin dự án');
            }
        } catch (err) {
            console.error('Lỗi khi tải thông tin dự án:', err);
            setError('Không thể tải thông tin dự án. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await updateProject(id, project, token);
            if (response.data) {
                setSuccess('Cập nhật dự án thành công!');
                setTimeout(() => {
                    navigate(`/projects/${id}`);
                }, 1000);
            }
        } catch (err) {
            console.error('Lỗi khi cập nhật dự án:', err);
            setError('Không thể cập nhật dự án. Vui lòng thử lại sau.');
        }
    };


    const handleUpdate = () => {
        const updatedProject = {
            id: project.id,
            name: project.name,
            type: project.type,
            emailPm: project.emailPm,
            startDate: formatDateWithOffset(project.startDate),
            endDate: formatDateWithOffset(project.endDate),
            description: project.description,
            status: project.status
        }
        console.log(updatedProject);
        const update = async () => {
            try {
                await updateProject(project.id, updatedProject, token);
                navigate(`/projects/${project.id}`);
            } catch (error) {
                console.error('Lỗi khi cập nhật dự án:', error);
            }
        }
        update();
    }

    if (loading) {
        return (
            <div className="edit-project-container">
                <div className="edit-project-card">
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Đang tải thông tin dự án...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <UpdateProject
            project={project}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            success={success}
            isEdit={true}
            onCancel={onCancel}
            handleUpdate={handleUpdate}
        />
    );
};

export default EditProject;
