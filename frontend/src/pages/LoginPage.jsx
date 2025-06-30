import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { resetPassword } from '../api/passwordApi';
import Modal from '../components/Modal';
import './css/LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    // State cho popup quên mật khẩu
    const [showResetModal, setShowResetModal] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetLoading, setResetLoading] = useState(false);
    const [resetMessage, setResetMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await login(formData);
            console.log("home");
            if (response.data) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    // Xử lý reset password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setResetMessage('');
        setResetLoading(true);

        try {
            await resetPassword(resetEmail);
            setResetMessage('Email đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra hộp thư của bạn.');
            setResetEmail('');
        } catch (err) {
            setResetMessage(err.response?.data?.message || 'Có lỗi xảy ra khi gửi email đặt lại mật khẩu');
        } finally {
            setResetLoading(false);
        }
    };

    const openResetModal = () => {
        setShowResetModal(true);
        setResetEmail('');
        setResetMessage('');
    };

    const closeResetModal = () => {
        setShowResetModal(false);
        setResetEmail('');
        setResetMessage('');
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <div className="login-content">
                    <div className="login-header">
                        <div className="logo">
                            <i className="fas fa-building fa-3x"></i>
                        </div>
                        <h1>Chào mừng trở lại!</h1>
                        <p>Đăng nhập để tiếp tục</p>
                    </div>

                    {error && (
                        <div className="error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {error}
                        </div>
                    )}

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-with-icon">
                            <i className="fas fa-envelope input-icon"></i>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-with-icon">
                            <i className="fas fa-lock input-icon"></i>
                            <input
                                type="password"
                                name="password"
                                className="form-input"
                                placeholder="Mật khẩu"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-options">
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span className="checkbox-custom"></span>
                                Ghi nhớ đăng nhập
                            </label>
                            <a href="#" className="forgot-link" onClick={openResetModal}>Quên mật khẩu?</a>
                        </div>

                        <button 
                            type="submit" 
                            className="button button-primary login-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="loading-spinner"></div>
                            ) : (
                                'Đăng nhập'
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Modal quên mật khẩu */}
            <Modal open={showResetModal} onClose={closeResetModal}>
                <div className="reset-password-modal">
                    <h2>Đặt lại mật khẩu</h2>
                    {resetMessage && (
                        <div className={`reset-message ${resetMessage.includes('đã được gửi') ? 'success' : 'error'}`}>
                            {resetMessage}
                        </div>
                    )}
                    <form onSubmit={handleResetPassword}>
                        <div className="input-with-icon">
                            <i className="fas fa-envelope input-icon"></i>
                            <input
                                type="email"
                                name="resetEmail"
                                className="form-input"
                                placeholder="Nhập email của bạn"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="button button-primary reset-button"
                            disabled={resetLoading}
                        >
                            {resetLoading ? (
                                <div className="loading-spinner"></div>
                            ) : (
                                'Gửi email đặt lại mật khẩu'
                            )}
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default LoginPage;
    