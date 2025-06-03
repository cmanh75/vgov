import React from 'react';
import './css/UserCard.css';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../api/userApi';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleDeleteUser = async () => {
    if(window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await deleteUser(user.id, token);
        navigate('/users');
      } catch {
        alert('Xóa thất bại!');
      }
    }
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
        <span className={`user-role-badge-modern role-${user.role?.toLowerCase()}`}>{user.role}</span>
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
        <div>
          <i className="fas fa-briefcase"></i>
          <span>Project ID</span>
          <b>{user.projectId}</b>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
        <button 
          className="edit-button"
          onClick={() => navigate(`/users/edit/${user.id}`)}
        >
          <i className="fas fa-edit"></i> Chỉnh sửa
        </button>
        {user.role && user.role.toLowerCase() !== 'admin' && (
          <button 
            className="delete-button"
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