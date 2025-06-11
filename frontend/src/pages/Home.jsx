import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Home.css';
import { jwtDecode } from 'jwt-decode';
import { getUserById } from '../api/userApi';

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let userId = null;
    if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        userId = decodedToken.userId;
        console.log("userId: " + userId);
    }
    console.log("token: " + token);
    const [user, setUser] = useState(null);
    const fetchUser = async () => {
        try {
            const response = await getUserById(userId, token);
            console.log(response);
            if (response && response.data) {
                setUser(response.data);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const navigationItems = [
        user && (user.role === 'ADMIN' || user.role === 'PM') && ({
            title: user.role === 'ADMIN' ? 'Quản lý dự án' : 'Xem dự án',
            icon: 'fas fa-project-diagram',
            path: `/projects${user.role === 'ADMIN' ? '' : `?informationId=${userId}`}`,
            description: 'Xem và quản lý tất cả các dự án'
        }),
        user && user.role === 'ADMIN' && ({
                title: 'Quản lý người dùng',
                icon: 'fas fa-users',
                path: '/users?page=1&querySearch=&roleFilter=PM',
                description: 'Quản lý thông tin người dùng và phân quyền'
        }),
        user && user.role === 'ADMIN' && ({
            title: 'Thống kê nhân viên',
            icon: 'fas fa-chart-bar',
            path: '/statistics/users',
            description: 'Xem báo cáo và thống kê nhân viên'
        }),
        user && user.role === 'ADMIN' && ({
            title: 'Thống kê dự án',
            icon: 'fas fa-cog',
            path: '/statistics/projects',
            description: 'Xem báo cáo và thống kê dự án'
        })
    ].filter(Boolean);

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
                                        navigate(`/login`);
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