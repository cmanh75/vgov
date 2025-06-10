import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllUsers, deleteUser, getUserByEmail, getUserById } from '../api/userApi';
import { getImageById } from '../api/imageApi';
import { deleteByInformationIdAndProjectId } from '../api/InfoProjectApi';
import './css/ShowAllUsers.css';
import { jwtDecode } from 'jwt-decode';

const ShowAllUsers = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const projectId = query.get('projectId');
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [allImages, setAllImages] = useState([]);
    const [groupedUsers, setGroupedUsers] = useState({});
    const token = localStorage.getItem('token');
    const [roleFilter, setRoleFilter] = useState('all');
    let userId = null;
    if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.userId;
    }
    const [user, setUser] = useState(null);
    const fetchUser = async () => {
        const response = await getUserById(userId, token);
        if (response && response.data) {
            setUser(response.data);
        }
    };

    useEffect(() => {
        async function fetchData() {
            await fetchUsers();
            await fetchAllImages();
            await fetchUser();
        }
        fetchData();
    }, []);

    const fetchUsers = async () => {
        try {
            console.log('projectId');
            console.log(projectId);
            const response = await getAllUsers(projectId, userId, token);
            const allUsers = response.data;
            setUsers(allUsers);
            setAllUsers(allUsers);
            refetchGroupedUsers(allUsers);
            return allUsers;
        } catch (err) {
            setError('Không thể tải danh sách người dùng. Vui lòng thử lại sau.');
            return [];
        } finally {
            setLoading(false);
        }
    };

    const fetchAllImages = async () => {
        const images = {};
        console.log(users);
        for (const user of users) {
            const response = await getImageById(user.id, token);
            images[user.id] = response;
        }
        console.log(images);
        setAllImages(images);
    } 

    const handleSearch = async (term) => {
        setSearchTerm(term);
        const newUsers = allUsers.filter(user =>
            user.name.toLowerCase().includes(term.toLowerCase()) ||
            user.email.toLowerCase().includes(term.toLowerCase())
        );
        setUsers(newUsers);
        await refetchGroupedUsers(newUsers);
        console.log(term);
    };

    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Lọc users theo role filter
    const filteredUsersByRole = roleFilter === 'all'
      ? filteredUsers
      : filteredUsers.filter(user => user.role === roleFilter);

    // Nhóm user theo role
    const refetchGroupedUsers = async (users) => {
        const groupedUsers = users.reduce((acc, user) => {
            const role = user.role || 'Khác';
            if (!acc[role]) acc[role] = [];
            acc[role].push(user);
            return acc;
        }, {}); 
        setGroupedUsers(groupedUsers);
    }

    const handleRemoveFromProject = async (userId) => {
        try {
            const newUsers = users.filter(user => user.id !== userId);
            await deleteByInformationIdAndProjectId(userId, projectId, token);
            setUsers(newUsers);
            await refetchGroupedUsers(newUsers);
            console.log(newUsers);
            console.log(groupedUsers);
        } catch (err) {
            alert('Không thể xóa khỏi dự án');
        }
    };

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
                        <span className="user-count">{filteredUsersByRole.length} người dùng</span>
                    </div>
                    <div className="header-right">
                        {user && user.role === 'ADMIN' && (<button 
                            className="create-user-button"
                            onClick={() => navigate(projectId ? `/projects/add-user?projectId=${projectId}` : '/users/create')}
                        >
                            <i className="fas fa-plus"></i>
                            {projectId ? 'Thêm Nhân Viên' : 'Tạo Người Dùng'}
                        </button>)}
                    </div>
                </div>
                <div className="users-actions-row">
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
                    <div className="role-filter-group">
                        <select
                            className="role-filter-select"
                            value={roleFilter}
                            onChange={e => setRoleFilter(e.target.value)}
                        >
                            <option value="all">Tất cả vai trò</option>
                            <option value="PM">Project Manager</option>
                            <option value="DEV">Developer</option>
                            <option value="BA">Business Analystic</option>
                            <option value="TEST">Tester</option>
                        </select>
                    </div>
                </div>

                {/* Hiển thị từng khối role */}
                {['ADMIN', 'PM', 'DEV', 'BA', 'TEST'].map(role => (
                    groupedUsers[role] && filteredUsersByRole.some(user => user.role === role) && (
                        <div key={role} className="role-block">
                            <h2 className="role-title">{ 
                                role === 'DEV' ? 'Developer' : 
                                role === 'TEST' ? 'Tester' :
                                role === 'BA' ? 'Business Analystic' :
                                role === 'PM' ? 'Project Manager' : 
                                role === 'ADMIN' ? 'Administrator' : role}</h2>
                            <div className="users-grid">
                                {groupedUsers[role]
                                  .filter(user => roleFilter === 'all' || user.role === roleFilter)
                                  .map(user => {
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
                                            {projectId && user && user.role === 'ADMIN' && (
                                                <button
                                                    className="remove-from-project-button"
                                                    onClick={e => { e.stopPropagation(); handleRemoveFromProject(user.id); }}
                                                >
                                                    <i className="fas fa-trash"></i> Xóa khỏi dự án
                                                </button>
                                            )}
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
