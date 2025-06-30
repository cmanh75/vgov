import React, { useState } from 'react';
import './css/UserCard.css';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../api/userApi';
import { deleteByInformationIdAndProjectId } from '../api/InfoProjectApi';
import axios from 'axios';
import { getAllProjectsByUserId } from '../api/projectApi';
import { getUserById } from '../api/userApi';
import { changePassword } from '../api/passwordApi';
import Modal from '../components/Modal';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const [showProjects, setShowProjects] = useState(false);
  const [projects, setProjects] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  
  // State cho popup đổi mật khẩu
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  
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

  // Xử lý đổi mật khẩu
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMessage('');

    // Kiểm tra mật khẩu mới và xác nhận
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    setPasswordLoading(true);

    try {
      const response = await changePassword(user.email, passwordForm.oldPassword, passwordForm.newPassword, token);
      
      // Kiểm tra response từ backend
      console.log(response);
      if (response.success) {
        setPasswordMessage('Đổi mật khẩu thành công!');
        setPasswordForm({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        // Đóng modal sau 2 giây khi thành công
        setTimeout(() => {
          closeChangePasswordModal();
        }, 2000);
      } else {
        // Nếu có lỗi từ backend, hiển thị message nhưng không đóng modal
        setPasswordMessage(response.message || 'Có lỗi xảy ra khi đổi mật khẩu');
      }
    } catch (err) {
      // Nếu có lỗi network hoặc lỗi khác, hiển thị message nhưng không đóng modal
      setPasswordMessage(err.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu');
    } finally {
      setPasswordLoading(false);
    }
  };

  const openChangePasswordModal = () => {
    setShowChangePasswordModal(true);
    setPasswordForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordMessage('');
  };

  const closeChangePasswordModal = () => {
    setShowChangePasswordModal(false);
    setPasswordForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordMessage('');
  };

  const handlePasswordInputChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
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
        {/* Nút đổi mật khẩu cho tất cả user */}
        {currentUser && user.id === currentUser.id && <button 
          className="usercard-change-password-button"
          onClick={openChangePasswordModal}
        >
          <i className="fas fa-key"></i> Đổi mật khẩu
        </button>}
      </div>

      {/* Modal đổi mật khẩu */}
      <Modal open={showChangePasswordModal} onClose={closeChangePasswordModal}>
        <div className="change-password-modal">
          <h2>Đổi mật khẩu</h2>
          {passwordMessage && (
            <div className={`password-message ${passwordMessage.includes('thành công') ? 'success' : 'error'}`}>
              {passwordMessage}
            </div>
          )}
          <form onSubmit={handleChangePassword}>
            <div className="input-with-icon">
              <i className="fas fa-lock input-icon"></i>
              <input
                type="password"
                name="oldPassword"
                className="form-input"
                placeholder="Mật khẩu cũ"
                value={passwordForm.oldPassword}
                onChange={handlePasswordInputChange}
                required
              />
            </div>
            <div className="input-with-icon">
              <i className="fas fa-key input-icon"></i>
              <input
                type="password"
                name="newPassword"
                className="form-input"
                placeholder="Mật khẩu mới"
                value={passwordForm.newPassword}
                onChange={handlePasswordInputChange}
                required
              />
            </div>
            <div className="input-with-icon">
              <i className="fas fa-key input-icon"></i>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="Xác nhận mật khẩu mới"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordInputChange}
                required
              />
            </div>
            <button 
              type="submit" 
              className="button button-primary change-password-button"
              disabled={passwordLoading}
            >
              {passwordLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                'Đổi mật khẩu'
              )}
            </button>
            <button 
              type="button" 
              className="button button-secondary close-modal-button"
              onClick={closeChangePasswordModal}
              disabled={passwordLoading}
            >
              Đóng
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UserCard; 