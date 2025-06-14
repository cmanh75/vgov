import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, updateProject } from '../api/projectApi';
import UpdateProject from './UpdateProject';
import '../pages/css/EditProject.css';
import { formatDateWithOffset } from '../utils/formatDateDb';
import { jwtDecode } from 'jwt-decode';

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token = localStorage.getItem('token');
    let userId = null;
    if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.userId;
    }

    const [project, setProject] = useState({
        id: '',
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


    const handleUpdate = (e) => {
        e.preventDefault();
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
                setSuccess('Cập nhật dự án thành công!');
                setTimeout(() => {
                    navigate(`/projects/${project.id}`);
                }, 1000);
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
            error={error}
            success={success}
            isEdit={true}
            onCancel={onCancel}
            handleUpdate={handleUpdate}
        />
    );
};

export default EditProject;
