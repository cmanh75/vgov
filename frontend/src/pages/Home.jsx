import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Home.css';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let userId = null;
    if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.userId;
    }
    const navigationItems = [
        {
            title: 'Quản lý dự án',
            icon: 'fas fa-project-diagram',
            path: '/projects',
            description: 'Xem và quản lý tất cả các dự án'
        },
        {
            title: 'Quản lý người dùng',
            icon: 'fas fa-users',
            path: '/users',
            description: 'Quản lý thông tin người dùng và phân quyền'
        },
        {
            title: 'Thống kê nhân viên',
            icon: 'fas fa-chart-bar',
            path: '/statistics/users',
            description: 'Xem báo cáo và thống kê'
        },
        {
            title: 'Thống kê dự án',
            icon: 'fas fa-cog',
            path: '/statistics/projects',
            description: 'Cấu hình hệ thống'
        }
    ];

    return (
        <div className="home-wrapper">
            <header className="home-header">
                <div className="header-flex">
                    <div className="header-content">
                        <h1 className="header-title">Hệ thống quản lý</h1>
                    </div>
                    <div style={{display: 'flex', gap: '1rem'}}>
                        {!token ? (
                            <button
                                className="logout-button"
                                onClick={() => navigate('/login')}
                            >
                                <i className="fas fa-sign-in-alt"></i>
                                Đăng nhập
                            </button>
                        ) : (
                            <>
                                <button 
                                    className="logout-button"
                                    style={{background: '#4834d4'}}
                                    onClick={() => navigate(`/users/${userId}`)}
                                >
                                    <i className="fas fa-user"></i>
                                    Thông tin cá nhân
                                </button>
                                <button 
                                    className="logout-button"
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        navigate(`/`);
                                    }}
                                >
                                    <i className="fas fa-sign-out-alt"></i>
                                    Đăng xuất
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="home-content">
                <div className="navigation-grid">
                    {navigationItems.map((item, index) => (
                        <div 
                            key={index}
                            className="nav-card"
                            onClick={() => navigate(item.path)}
                        >
                            <div className="nav-icon">
                                <i className={item.icon}></i>
                            </div>
                            <h3 className="nav-title">{item.title}</h3>
                            <p className="nav-description">{item.description}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Home; 