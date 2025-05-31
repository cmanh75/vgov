import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, updateProject } from '../api/projectApi';
import '../pages/css/EditProject.css';

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
                }, 2000);
            }
        } catch (err) {
            console.error('Lỗi khi cập nhật dự án:', err);
            setError('Không thể cập nhật dự án. Vui lòng thử lại sau.');
        }
    };

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
        <div className="edit-project-container">
            <div className="edit-project-card">
                <div className="edit-project-header">
                    <h1 className="edit-project-title">Chỉnh Sửa Dự Án</h1>
                    <p className="edit-project-subtitle">Cập nhật thông tin dự án</p>
                </div>

                <form onSubmit={handleSubmit} className="edit-project-form">
                    {error && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="success-message">
                            <span className="success-icon">✅</span>
                            {success}
                        </div>
                    )}

                    <div className="form-section">
                        <h2 className="section-title">
                            <i className="fas fa-info-circle"></i>
                            Thông Tin Cơ Bản
                        </h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="name">Tên Dự Án</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={project.name}
                                    onChange={handleChange}
                                    placeholder="Nhập tên dự án"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="emailPm">Email Quản Lý</label>
                                <input
                                    type="email"
                                    id="emailPm"
                                    name="emailPm"
                                    value={project.emailPm}
                                    onChange={handleChange}
                                    placeholder="Nhập email quản lý"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2 className="section-title">
                            <i className="fas fa-clock"></i>
                            Thời Gian
                        </h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="startDate">Ngày Bắt Đầu</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={project.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="endDate">Ngày Kết Thúc</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    value={project.endDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2 className="section-title">
                            <i className="fas fa-cog"></i>
                            Trạng Thái
                        </h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="status">Trạng Thái Dự Án</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={project.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Chọn Trạng Thái</option>
                                    <option value="ACTIVE">Đang Hoạt Động</option>
                                    <option value="PENDING">Đang Chờ</option>
                                    <option value="COMPLETED">Hoàn Thành</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="type">Loại Dự Án</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={project.type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Chọn Loại Dự Án</option>
                                    <option value="Hold">Tạm Dừng</option>
                                    <option value="Active">Đang Thực Hiện</option>
                                    <option value="Completed">Hoàn Thành</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2 className="section-title">
                            <i className="fas fa-align-left"></i>
                            Mô Tả
                        </h2>
                        <div className="form-group">
                            <label htmlFor="description">Mô Tả Dự Án</label>
                            <textarea
                                id="description"
                                name="description"
                                value={project.description}
                                onChange={handleChange}
                                placeholder="Nhập mô tả dự án"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => navigate(`/projects/${id}`)}
                        >
                            Hủy
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                        >
                            Lưu Thay Đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProject;
