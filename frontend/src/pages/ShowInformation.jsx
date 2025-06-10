import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../api/userApi';
import './css/ShowInformation.css';
import UserCard from './UserCard';
import { getImageById } from '../api/imageApi';
import { jwtDecode } from 'jwt-decode';

const ShowInformation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [image, setImage] = useState(null);
    const token = localStorage.getItem('token');
    let userId = null;
    if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.userId;
    }
    useEffect(() => {
        async function fetchData() {
            await fetchUserInfo();
            await fetchImage();
            await fetchUser();
        }
        fetchData();
    }, [id]);

    const fetchUser = async () => {
        const response = await getUserById(userId, token);
        if (response && response.data) {
            setUser(response.data);
        }
    };

    const fetchImage = async () => {
        try {
            const response = await getImageById(id, token);
            if (response) {
                const imageUrl = URL.createObjectURL(response);
                console.log(imageUrl);
                setImage(imageUrl);
            } // response.data là URL hoặc base64
        } catch (err) {
            setError('Không thể tải ảnh. Vui lòng thử lại sau.');
        }
    }
    
    const fetchUserInfo = async () => {
        try {
            const response = await getUserById(id, token);
            console.log(response.data);
            setUserInfo(response.data);
        } catch (err) {
            setError('Không thể tải thông tin người dùng. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
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

    if (!userInfo) {
        return (
            <div className="error-wrapper">
                <i className="fas fa-search error-icon"></i>
                <p className="error-message">Không tìm thấy thông tin người dùng</p>
            </div>
        );
    }

    return (
        <div className="show-information-container">
            <div className="information-header">
                <button 
                    className="home-button"
                    onClick={() => navigate('/')}
                >
                    <i className="fas fa-home"></i>
                    <span>Trang chủ</span>
                </button>
                <h1 className="header-title">Thông Tin Chi Tiết</h1>
            </div>
            <div className="information-content">
                <UserCard user={{ ...userInfo, avatarUrl: image }} />
            </div>
        </div>
    );
};

export default ShowInformation;
