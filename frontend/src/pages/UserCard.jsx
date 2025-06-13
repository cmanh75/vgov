import React, { useState } from 'react';
import './css/UserCard.css';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../api/userApi';
import { deleteByInformationIdAndProjectId } from '../api/InfoProjectApi';
import axios from 'axios';
import { getAllProjectsByUserId } from '../api/projectApi';
import { getUserById } from '../api/userApi';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const [showProjects, setShowProjects] = useState(false);
  const [projects, setProjects] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem('token');
  let userId = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.userId;
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const response = await getUserById(userId, token);
    if (response && response.data) {
      setCurrentUser(response.data);
    }
  };

  const mappedRole = {
    'ADMIN': 'Quản trị viên',
    'PM': 'Quản lý dự án',
    'BA': 'Phân tích nghiệp vụ',
    'TEST': 'Kiểm thử',
    'DEV': 'Lập trình viên',
  }

  const handleDeleteUser = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      console.log(user.id);
      await deleteByInformationIdAndProjectId(user.id, null, token);
      await deleteUser(user.id, token);
      navigate(`/users?page=1&querySearch=&roleFilter=all`);
    }
  };

  const handleViewProjects = async () => {
    navigate(`/projects?informationId=${user.id}`);
  };

  return (
    <div className="user-card-modern" style={{ maxWidth: 520, minWidth: 380, width: '100%' }}>
      <div className="user-avatar-modern" style={{ width: 140, height: 140, marginBottom: '1.5rem' }}>
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt="avatar"
            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
          />
        ) : (
          <i className="fas fa-user"></i>
        )}
      </div>
      <div className="user-name-role">
        <span className="user-name-modern" style={{ fontSize: '2rem' }}>{user.name}</span>
        <span className={`user-role-badge-modern role-${user.role?.toLowerCase()}`}>{mappedRole[user.role]}</span>
      </div>
      <div className="user-details-modern" style={{ fontSize: '1.15rem', gap: '1.3rem', padding: '1.7rem 1.7rem 1.2rem 1.7rem' }}>
        <div>
          <i className="fas fa-envelope"></i>
          <span>Email</span>
          <b>{user.email}</b>
        </div>
        <div>
          <i className="fas fa-birthday-cake"></i>
          <span>Ngày sinh</span>
          <b>{user.dob ? new Date(user.dob).toLocaleDateString('vi-VN') : ''}</b>
        </div>
        <div>
          <i className="fas fa-venus-mars"></i>
          <span>Giới tính</span>
          <b>{user.gender && user.gender.toLowerCase() === 'male' ? 'Nam' : user.gender && user.gender.toLowerCase() === 'female' ? 'Nữ' : ''}</b>
        </div>
      </div>
      
      <div className="usercard-actions-row">
        {currentUser && currentUser.role === 'ADMIN' && user.id !== currentUser.id && (
          <button 
          className="usercard-edit-button"
          onClick={() => navigate(`/users/edit/${user.id}`)}
          >
            <i className="fas fa-edit"></i> Chỉnh sửa
          </button>
        )}
        {currentUser && currentUser.role === 'ADMIN' && user.id !== currentUser.id && (
          <button 
            className="usercard-view-project-button"
            onClick={handleViewProjects}
          >
            <i className="fas fa-project-diagram"></i> Xem dự án
          </button>
        )}
        {currentUser && currentUser.role === 'ADMIN' && user.id !== currentUser.id && (
          <button 
            className="usercard-delete-button"
            onClick={handleDeleteUser}
          >
            <i className="fas fa-trash"></i> Xóa
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard; 