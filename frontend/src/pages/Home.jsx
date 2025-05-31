import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Home.css';

const Home = () => {
    const navigate = useNavigate();

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
            title: 'Báo cáo',
            icon: 'fas fa-chart-bar',
            path: '/reports',
            description: 'Xem báo cáo và thống kê'
        },
        {
            title: 'Cài đặt',
            icon: 'fas fa-cog',
            path: '/settings',
            description: 'Cấu hình hệ thống'
        }
    ];

    return (
        <div className="home-wrapper">
            <header className="home-header">
                <div className="header-content">
                    <h1 className="header-title">Hệ thống quản lý</h1>
                    <p className="header-subtitle">
                        Chào mừng đến với hệ thống quản lý dự án
                    </p>
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