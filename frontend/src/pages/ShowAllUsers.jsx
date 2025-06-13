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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(parseInt(query.get('page')) || 1);
    const [searchTerm, setSearchTerm] = useState('');
    const [allImages, setAllImages] = useState([]);
    const [groupedUsers, setGroupedUsers] = useState({});
    const token = localStorage.getItem('token');
    const [roleFilter, setRoleFilter] = useState(query.get('roleFilter') || 'all');
    const [querySearch, setQuerySearch] = useState(query.get('querySearch'));
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    let userId = null;
    if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.userId;
    }
    const [currentUser, setCurrentUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6; // Số người dùng hiển thị trên mỗi trang
    const fetchCurrentUser = async () => {
        const response = await getUserById(userId, token);
        if (response && response.data) {
            setCurrentUser(response.data);
        }
    };

    useEffect(() => {
        async function fetchData() {
            await fetchCurrentUser();
            const fetchedUsers = await fetchUsers();
            await fetchAllImages(fetchedUsers);
        }
        fetchData();
    }, [page, querySearch, roleFilter]);


    const fetchUsers = async () => {
        try {
            const response = await getAllUsers(querySearch, roleFilter, page, projectId, userId, token);
            const allUsers = response.data.informations;
            const totalUsers = response.data.totalUsers;
            setTotalUsers(totalUsers);
            setTotalPages(Math.ceil(totalUsers / usersPerPage));
            setUsers(allUsers);
            console.log(totalUsers);
            return allUsers;
        } catch (err) {
            setError('Không thể tải danh sách người dùng. Vui lòng thử lại sau.');
            return [];
        } finally {
            setLoading(false);
        }
    };

    const fetchAllImages = async (users) => {
        const images = {};
        console.log(users);
        for (const user of users) {
            const response = await getImageById(user.id, token);
            images[user.id] = response;
        }
        console.log(images);
        setAllImages(images);
    } 

    const handleRoleFilterChange = (value) => {
        setRoleFilter(value);
        setPage(1);
        if (projectId) {
            navigate(`/users?projectId=${projectId}&page=1&querySearch=${querySearch}&roleFilter=${value}`);
        } else {
            navigate(`/users?page=1&querySearch=${querySearch}&roleFilter=${value}`);
        }
    };

    const handleSearch = async (value) => {
        setSearchTerm(value);
        setQuerySearch(value);
        setPage(1);
        if (projectId) {
            navigate(`/users?projectId=${projectId}&page=1&querySearch=${value}&roleFilter=${roleFilter}`);
        } else {
            navigate(`/users?page=1&querySearch=${value}&roleFilter=${roleFilter}`);
        }
    };

    const handleNextPage = async () => {
        setPage(page + 1);
        if (projectId) {
            navigate(`/users?projectId=${projectId}&page=${page + 1}&querySearch=${querySearch}&roleFilter=${roleFilter}`);
        } else {
            navigate(`/users?page=${page + 1}&querySearch=${querySearch}&roleFilter=${roleFilter}`);
        }
    }

    const handlePreviousPage = async () => {
        setPage(page - 1);
        if (projectId) {
            navigate(`/users?projectId=${projectId}&page=${page - 1}&querySearch=${querySearch}&roleFilter=${roleFilter}`);
        } else {
            navigate(`/users?page=${page - 1}&querySearch=${querySearch}&roleFilter=${roleFilter}`);
        }
    }

    const handleRemoveFromProject = async (userId) => {
        try {
            await deleteByInformationIdAndProjectId(userId, projectId, token);
            const fetchedUsers = await fetchUsers();
            await fetchAllImages(fetchedUsers);
        } catch (err) {
            alert('Không thể xóa khỏi dự án');
        }
    };

    // Lấy danh sách người dùng cho trang hiện tại
    const getCurrentPageUsers = (users) => {
        const startIndex = (currentPage - 1) * usersPerPage;
        const endIndex = startIndex + usersPerPage;
        return users.slice(startIndex, endIndex);
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
                        <span className="user-count">{totalUsers} người dùng</span>
                    </div>
                    <div className="header-right">
                        {currentUser && currentUser.role === 'ADMIN' && (<button 
                            className="create-user-button"
                            onClick={() => navigate(projectId ? `/projects/add-user?projectId=${projectId}` : '/users/create')}
                        >
                            <i className="fas fa-plus"></i>
                            {projectId ? 'Thêm Nhân Viên' : 'Tạo Người Dùng'}
                        </button>)}
                    </div>
                </div>
                <div className="users-actions-row" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div className="role-filter-group">
                        <select
                            className="role-filter-select"
                            value={roleFilter}
                            onChange={e => handleRoleFilterChange(e.target.value)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                backgroundColor: 'white'
                            }}
                        >
                            <option value="all">Tất cả</option>
                            <option value="PM">Project Manager</option>
                            <option value="DEV">Developer</option>
                            <option value="BA">Business Analystic</option>
                            <option value="TEST">Tester</option>
                        </select>
                    </div>
                    <div className="search-bar" style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1 }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <i className="fas fa-search search-icon" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}></i>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Tìm kiếm người dùng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ 
                                    padding: '8px 35px',
                                    width: '100%',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }}
                            />
                        </div>
                        <button 
                            onClick={() => handleSearch(searchTerm)}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}
                        >
                            <i className="fas fa-search"></i>
                            Tìm kiếm
                        </button>
                    </div>
                </div>

                {/* Hiển thị danh sách người dùng */}
                <div className="users-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',
                    padding: '20px'
                }}>
                    {getCurrentPageUsers(users
                        .filter(user => roleFilter === 'all' || user.role === roleFilter))
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
                                        <span className="user-role">{user.role}</span>
                                    </div>
                                    {projectId && currentUser?.role === 'ADMIN' && (
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

            {/* Pagination Controls */}
            <div className="pagination-controls" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                marginTop: '20px',
                gap: '10px'
            }}>
                {page > 1 && <button 
                    className="pagination-button"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: page === 1 ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: page === 1 ? 'not-allowed' : 'pointer'
                    }}
                >
                    <i className="fas fa-chevron-left"></i> Trang trước
                </button>}
                <span style={{ fontSize: '16px' }}>
                    Trang {page} / {totalPages}
                </span>
                {page < totalPages && <button 
                    className="pagination-button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: currentPage === totalPages ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                    }}
                >
                    Trang sau <i className="fas fa-chevron-right"></i>
                </button>}
            </div>
        </div>
    );
};

export default ShowAllUsers;
