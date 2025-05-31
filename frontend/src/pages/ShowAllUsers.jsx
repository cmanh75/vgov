import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUser } from '../api/userApi';
import './css/ShowAllUsers.css';

const ShowAllUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 9;
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers(token);
            console.log(response.data);
            setUsers(response.data);
        } catch (err) {
            setError('Không thể tải danh sách người dùng. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            try {
                await deleteUser(userId, token);
                setUsers(users.filter(user => user.id !== userId));
            } catch (err) {
                setError('Không thể xóa người dùng. Vui lòng thử lại sau.');
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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
        <div className="users-wrapper">
            <div className="users-container">
                <div className="users-header">
                    <div className="header-left">
                        <h1 className="header-title">Danh sách người dùng</h1>
                        <span className="user-count">{filteredUsers.length} người dùng</span>
                    </div>
                    <div className="search-bar">
                        <i className="fas fa-search search-icon"></i>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Tìm kiếm người dùng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="users-grid">
                    {currentUsers.map(user => (
                        <div key={user.id} className="user-card">
                            <div className="user-avatar-large">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="user-name-row">
                                <h3 className="user-name">{user.name}</h3>
                            </div>
                            <div className="user-role-row">
                                <span className={`user-role-badge role-${user.role.toLowerCase()}`}>{user.role}</span>
                            </div>
                            <div className="user-role-status-row">
                                <span className={`user-status-badge status-${user.status}`}>{user.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}</span>
                            </div>
                            <div className="user-details-grid">
                                <div className="user-detail-cell">
                                    <i className="fas fa-envelope"></i>
                                    <span className="detail-label">Email</span>
                                    <span className={`detail-value email-value${user.email && user.email.length > 25 ? ' long-email' : ''}`}>{user.email}</span>
                                </div>
                                <div className="user-detail-cell">
                                    <i className="fas fa-birthday-cake"></i>
                                    <span className="detail-label">Ngày sinh</span>
                                    <span className="detail-value">{user.dob ? new Date(user.dob).toLocaleDateString('vi-VN') : ''}</span>
                                </div>
                                <div className="user-detail-cell">
                                    <i className="fas fa-venus-mars"></i>
                                    <span className="detail-label">Giới tính</span>
                                    <span className="detail-value">{user.gender === 'MALE' ? 'Nam' : user.gender === 'FEMALE' ? 'Nữ' : ''}</span>
                                </div>
                                <div className="user-detail-cell">
                                    <i className="fas fa-briefcase"></i>
                                    <span className="detail-label">Project ID</span>
                                    <span className="detail-value">{user.projectId}</span>
                                </div>
                            </div>
                            <div className="user-actions">
                                <button 
                                    className="action-button edit-button"
                                    onClick={() => navigate(`/users/edit/${user.id}`)}
                                >
                                    <i className="fas fa-edit"></i>
                                    Chỉnh sửa
                                </button>
                                <button 
                                    className="action-button delete-button"
                                    onClick={() => handleDelete(user.id)}
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

export default ShowAllUsers;
