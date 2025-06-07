import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProjects, deleteProject, getProjectByInformationId } from '../api/projectApi';
import './css/ShowAllProjects.css';
import { useLocation } from 'react-router-dom';

const ShowAllProjects = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const informationId = query.get('informationId');
    const [filters, setFilters] = useState({
        status: 'all',
        priority: 'all'
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [currentProjects, setCurrentProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 9;
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await getAllProjects(informationId, token);
            console.log(response.data);
            setProjects(response.data);
            setCurrentProjects(response.data);
            console.log(currentProjects);
        } catch (err) {
            setError('Không thể tải danh sách dự án. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (projectId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
            try {
                await deleteProject(projectId, token);
                setProjects(projects.filter(project => project.id !== projectId));
            } catch (err) {
                setError('Không thể xóa dự án. Vui lòng thử lại sau.');
            }
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(value);
        const filteredProjects = projects.filter(project => {
            if (value === 'all') {
                return true;
            }
            const matchesStatus = project.status.toUpperCase() === value.toUpperCase();
            return matchesStatus;
        });
        setCurrentProjects(filteredProjects);
        setCurrentPage(1);
    };

    const handleSearchChange = (text) => {
        console.log(text);
        setSearchQuery(text);
        const filteredProjects = projects.filter(project => {
            const matchesSearchByName = project.name.toLowerCase().includes(text.toLowerCase());
            const matchesSearchById = project.id.toLowerCase().includes(text.toLowerCase());
            return matchesSearchByName || matchesSearchById;
        });
        console.log(filteredProjects);
        setCurrentProjects(filteredProjects);
        setCurrentPage(1);
    };


    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const totalPages = Math.ceil(currentProjects.length / projectsPerPage);

    if (loading) {
        return (
            <div className="loading-wrapper">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-wrapper">
                <i className="fas fa-exclamation-circle error-icon"></i>
                <p className="error-message">{error}</p>
            </div>
        );
    }

    return (
        <div className="projects-wrapper">
            <div className="projects-container">
                <div className="projects-header">
                    <div className="header-left">
                        <button 
                            className="home-button"
                            onClick={() => navigate('/')}
                        >
                            <i className="fas fa-home"></i>
                            <span>Trang chủ</span>
                        </button>
                        <h1 className="header-title">Danh sách dự án</h1>
                        <span className="project-count">{currentProjects.length} dự án</span>
                    </div>
                    <button 
                        className="button button-primary"
                        onClick={() => navigate('/projects/create')}
                    >
                        <i className="fas fa-plus"></i>
                        Tạo dự án mới
                    </button>
                </div>

                <div className="search-filter-container">
                    <div className="search-bar">
                        <i className="fas fa-search search-icon"></i>
                        <input
                            type="text"
                            placeholder="Tìm kiếm dự án..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="filter-bar">
                        <div className="filter-group">
                            <select
                                name="status"
                                className="filter-select"
                                value={filters.status}
                                onChange={handleFilterChange}
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="closed">Đã đóng</option>
                                <option value="in-progress">Đang thực hiện</option>
                                <option value="hold">Đang chờ</option>
                                <option value="presale">Chuẩn bị</option>
                            </select>
                            <i className="fas fa-chevron-down filter-icon"></i>
                        </div>
                    </div>
                </div>

                <div className="projects-grid">
                    {currentProjects.map(project => (
                        <div key={project.id} className="project-card">
                            <div className="project-icon">
                                <i className="fas fa-project-diagram"></i>
                            </div>
                            <div className="project-header-row">
                                <div>
                                    <h3 className="project-title">{project.name}</h3>
                                </div>
                            </div>
                            <div className="project-id">{project.id}</div>
                            <p className="project-description">{project.description}</p>
                            <div className="project-details-grid">
                                <div className="detail-cell">
                                    <i className="fas fa-calendar-alt"></i>
                                    <div>
                                        <div className="detail-label">Ngày bắt đầu</div>
                                        <div className="detail-value">{new Date(project.startDate).toLocaleDateString('vi-VN')}</div>
                                    </div>
                                </div>
                                <div className="detail-cell">
                                    <i className="fas fa-calendar-check"></i>
                                    <div>
                                        <div className="detail-label">Ngày kết thúc</div>
                                        <div className="detail-value">{new Date(project.endDate).toLocaleDateString('vi-VN')}</div>
                                    </div>
                                </div>
                                <div className="detail-cell">
                                    <i className="fas fa-envelope"></i>
                                    <div>
                                        <div className="detail-label">Email PM</div>
                                        <div className="detail-value email-value" title={project.emailPm}>{project.emailPm}</div>
                                    </div>
                                </div>
                                <div className="detail-cell">
                                    <i className="fas fa-tag"></i>
                                    <div>
                                        <div className="detail-label">Loại dự án</div>
                                        <div className="detail-value">{project.type}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="project-actions">
                                <button 
                                    className="action-button view-button"
                                    onClick={() => navigate(`/projects/${project.id}`)}
                                >
                                    <i className="fas fa-eye"></i>
                                    Xem chi tiết
                                </button>
                                <button 
                                    className="action-button edit-button"
                                    onClick={() => navigate(`/projects/edit/${project.id}`)}
                                >
                                    <i className="fas fa-edit"></i>
                                    Chỉnh sửa
                                </button>
                                <button 
                                    className="action-button delete-button"
                                    onClick={() => handleDelete(project.id)}
                                >
                                    <i className="fas fa-trash"></i>
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            className="page-button"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        
                        <button
                            className="page-button"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowAllProjects;
