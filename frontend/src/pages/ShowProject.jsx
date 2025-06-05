import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, updateProject } from '../api/projectApi';
import '../pages/css/ShowProject.css';

const ShowProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const response = await getProjectById(id, token);
            if (response && response.data) {
                setProject(response.data);
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

    // Format date function
    const formatDate = (dateString) => {
        if (!dateString) return 'Chưa cập nhật';
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    // Get status text in Vietnamese
    const getStatusText = (status) => {
        switch (status) {
            case 'ACTIVE':
                return 'Đang Hoạt Động';
            case 'PENDING':
                return 'Đang Chờ';
            case 'COMPLETED':
                return 'Hoàn Thành';
            default:
                return status || 'Chưa cập nhật';
        }
    };

    // Get type text in Vietnamese
    const getTypeText = (type) => {
        switch (type) {
            case 'Hold':
                return 'Tạm Dừng';
            case 'Active':
                return 'Đang Thực Hiện';
            case 'Completed':
                return 'Hoàn Thành';
            default:
                return type || 'Chưa cập nhật';
        }
    };

    if (loading) {
        return (
            <div className="project-container">
                <div className="project-card">
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Đang tải thông tin dự án...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="project-container">
                <div className="project-card">
                    <div className="error-state">
                        <i className="fas fa-exclamation-circle"></i>
                        <p>{error}</p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => navigate('/projects')}
                        >
                            Quay Lại Danh Sách
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="project-container">
                <div className="project-card">
                    <div className="error-state">
                        <i className="fas fa-search"></i>
                        <p>Không tìm thấy thông tin dự án</p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => navigate('/projects')}
                        >
                            Quay Lại Danh Sách
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="project-container">
            <div className="project-card">
                <div className="project-header">
                    <h1 className="project-title">{project.name || 'Chưa có tên'}</h1>
                    <div className="project-id">Mã dự án: {project.id || 'Chưa có mã'}</div>
                    <div className="project-status">
                        {getStatusText(project.status)}
                    </div>
                </div>

                <div className="project-content">
                    <div className="project-section">
                        <h2 className="section-title">
                            <i className="fas fa-info-circle"></i>
                            Thông Tin Dự Án
                        </h2>
                        <div className="project-info-grid">
                            <div className="info-item">
                                <div className="info-label">Loại Dự Án</div>
                                <div className="info-value">{getTypeText(project.type)}</div>
                            </div>
                            <div className="info-item">
                                <div className="info-label">Email Quản Lý</div>
                                <div className="info-value">{project.emailPm || 'Chưa cập nhật'}</div>
                            </div>
                        </div>
                    </div>

                    <div className="project-section">
                        <h2 className="section-title">
                            <i className="fas fa-clock"></i>
                            Thời Gian
                        </h2>
                        <div className="project-timeline">
                            <div className="timeline-item">
                                <div className="timeline-label">Ngày Bắt Đầu</div>
                                <div className="timeline-value">{formatDate(project.startDate)}</div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-label">Ngày Kết Thúc</div>
                                <div className="timeline-value">{formatDate(project.endDate)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="project-section">
                        <h2 className="section-title">
                            <i className="fas fa-align-left"></i>
                            Mô Tả Dự Án
                        </h2>
                        <div className="project-description">
                            <p>{project.description || 'Chưa có mô tả'}</p>
                        </div>
                    </div>

                    <div className="project-actions">
                        <button 
                            className="btn btn-secondary"
                            onClick={() => navigate('/projects')}
                        >
                            Quay Lại
                        </button>
                        <button 
                            className="btn btn-primary"
                            onClick={() => navigate(`/projects/edit/${project.id}`)}
                        >
                            Chỉnh Sửa
                        </button>
                        <button
                            className="btn btn-info"
                            style={{ background: '#6c5ce7', color: '#fff', marginLeft: '0.5rem' }}
                            onClick={() => navigate(`/users?projectId=${project.id}`)}
                        >
                            <i className="fas fa-users" style={{ marginRight: 6 }}></i>
                            Xem Danh Sách Nhân Viên
                        </button>
                        <button
                            className="btn btn-info"
                            style={{ background: '#00b894', color: '#fff', marginLeft: '0.5rem' }}
                            onClick={() => navigate(`/statistics/users?projectId=${project.id}`)}
                        >
                            <i className="fas fa-chart-bar" style={{ marginRight: 6 }}></i>
                            Thống kê nhân viên
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowProject;