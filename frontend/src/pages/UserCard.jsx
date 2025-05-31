import React from 'react';
import './css/UserCard.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card-modern">
      <div className="user-avatar-modern">
        <i className="fas fa-user"></i>
      </div>
      <div className="user-name-role">
        <span className="user-name-modern">{user.name}</span>
        <span className={`user-role-badge-modern role-${user.role.toLowerCase()}`}>{user.role}</span>
      </div>
      <div className="user-details-modern">
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
          <b>{user.gender === 'MALE' ? 'Nam' : user.gender === 'FEMALE' ? 'Nữ' : ''}</b>
        </div>
        <div>
          <i className="fas fa-briefcase"></i>
          <span>Project ID</span>
          <b>{user.projectId}</b>
        </div>
      </div>
    </div>
  );
};

export default UserCard; 