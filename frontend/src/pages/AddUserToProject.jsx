import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllUsers, getAllUsersForStatistic } from '../api/userApi';
import { getProjectById } from '../api/projectApi';
import { addInformationByProjectId } from '../api/InfoProjectApi';
import './css/AddUserToProject.css';
import { jwtDecode } from 'jwt-decode';

const AddUserToProject = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const projectId = query.get('projectId');
    const [users, setUsers] = useState([]);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('token');
    const [showSuccess, setShowSuccess] = useState(false);
    let userId = null;
    if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.userId;
    }

    useEffect(() => {
        const loadData = async () => {
            await fetchProject();
            await fetchUsers();
        };
        loadData();
    }, []);

    const fetchProject = async () => {
        try {
            const response = await getProjectById(projectId, userId, token);
            setProject(response.data);
        } catch (err) {
            setError('Không thể tải thông tin dự án');
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await getAllUsersForStatistic(null, token);
            const users = response.data;
            setUsers(users.slice(1, users.length));
        } catch (err) {
            setError('Không thể tải danh sách người dùng');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (term) => {
        setSearchTerm(term);
    };

    const handleAddUser = async (userId) => {
        try {
            const data = {
                projectId: projectId,
                informationIds: [userId]
            }
            await addInformationByProjectId(data, token);
        } catch (err) {
            setError('Không thể thêm người dùng vào dự án');
        }
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1500);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <div className="add-user-wrapper">
            <div className="add-user-container">
                <div className="add-user-header">
                    <div className="header-left">
                        <button 
                            className="back-button"
                            onClick={() => navigate(`/users?projectId=${projectId}`)}
                        >
                            <i className="fas fa-arrow-left"></i>
                            <span>Quay lại</span>
                        </button>
                        <h1 className="header-title">
                            Thêm nhân viên vào dự án {project?.name}
                        </h1>
                    </div>
                </div>

                <div className="search-section">
                    <div className="search-bar">
                        <i className="fas fa-search search-icon"></i>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Tìm kiếm nhân viên..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="users-grid">
                    {filteredUsers.map(user => (
                        <div key={user.id} className="user-card">
                            <div className="user-info">
                                <h3 className="user-name">{user.name}</h3>
                                <p className="user-email">{user.email}</p>
                                <span className="user-role">{user.role}</span>
                            </div>
                            <button 
                                className="add-button"
                                onClick={() => handleAddUser(user.id)}
                            >
                                <i className="fas fa-plus"></i>
                                Thêm vào dự án
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {showSuccess && (
                <div className="popup-success">
                    <i className="fas fa-check-circle"></i> Thêm thành công!
                </div>
            )}
        </div>
    );
};

export default AddUserToProject;
