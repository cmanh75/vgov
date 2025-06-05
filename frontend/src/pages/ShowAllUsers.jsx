import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllUsers, deleteUser, getUserByEmail } from '../api/userApi';
import { getImageById } from '../api/imageApi';
import './css/ShowAllUsers.css';

const ShowAllUsers = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const projectId = query.get('projectId');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentList, setCurrentList] = useState([]);
    const [allImages, setAllImages] = useState([]);
    const usersPerPage = 9;
    const token = localStorage.getItem('token');

    useEffect(() => {
        const loadData = async () => {
            const allUsers = await fetchUsers();
            await fetchAllImages(allUsers);
        }
        loadData();
    }, []);

    const fetchUsers = async () => {
        try {
            console.log('projectId');
            console.log(projectId);
            const response = await getAllUsers(projectId, token);
            const allUsers = response.data;
            setUsers(allUsers);
            setCurrentList(allUsers);
            return allUsers;
        } catch (err) {
            setError('Không thể tải danh sách người dùng. Vui lòng thử lại sau.');
            return [];
        } finally {
            setLoading(false);
        }
    };

    const fetchAllImages = async (allUsers) => {
        const images = {};
        console.log(users);
        for (const user of allUsers) {
            const response = await getImageById(user.id, token);
            images[user.id] = response;
        }
        console.log(images);
        setAllImages(images);
    } 

    const handleSearch = async (term) => {
        setSearchTerm(term);
        const newUsers = users.filter(user =>
            user.name.toLowerCase().includes(term.toLowerCase()) ||
            user.email.toLowerCase().includes(term.toLowerCase())
        );
        setCurrentList(newUsers);
        console.log(term);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Nhóm user theo role
    const groupedUsers = currentList.reduce((acc, user) => {
        const role = user.role || 'Khác';
        if (!acc[role]) acc[role] = [];
        acc[role].push(user);
        return acc;
    }, {});

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
                        <button 
                            className="home-button"
                            onClick={() => navigate('/')}
                        >
                            <i className="fas fa-home"></i>
                            <span>Trang chủ</span>
                        </button>
                        <h1 className="header-title">
                          {projectId ? 'Danh sách nhân viên' : 'Danh sách toàn bộ nhân viên'}
                        </h1>
                        <span className="user-count">{filteredUsers.length} người dùng</span>
                    </div>
                    <div className="header-right">
                        <div className="search-bar">
                            <i className="fas fa-search search-icon"></i>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Tìm kiếm người dùng..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                        <button 
                            className="create-user-button"
                            onClick={() => navigate('/users/create')}
                        >
                            <i className="fas fa-plus"></i>
                            Tạo Người Dùng
                        </button>
                    </div>
                </div>

                {/* Hiển thị từng khối role */}
                {['PM', ...Object.keys(groupedUsers).filter(r => r !== 'PM')].map(role => (
                    groupedUsers[role] && (
                        <div key={role} className="role-block">
                            <h2 className="role-title">{ 
                                                        role === 'DEV' ? 'Developer' : 
                                                        role === 'TEST' ? 'Tester' :
                                                        role === 'BA' ? 'Business Analystic' :
                                                        role === 'PM' ? 'Project Manager' : role}</h2>
                            <div className="users-grid">
                                {groupedUsers[role].map(user => {
                                    let avatarUrl = null;
                                    if (allImages[user.id]) {
                                        try {
                                            avatarUrl = URL.createObjectURL(allImages[user.id]);
                                        } catch {}
                                    }
                                    return (
                                        <div 
                                            key={user.id} 
                                            className="user-card compact"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => navigate(`/users/${user.id}`)}
                                        >
                                            <div className="user-avatar-mini">
                                                {allImages[user.id] ? (
                                                    <img src={URL.createObjectURL(allImages[user.id])} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                                ) : (
                                                    <i className="fas fa-user"></i>
                                                )}
                                            </div>
                                            <div className="user-name-row">
                                                <h3 className="user-name">{user.name}</h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default ShowAllUsers;
