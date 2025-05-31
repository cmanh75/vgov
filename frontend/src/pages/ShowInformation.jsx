import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../api/userApi';
import './css/ShowInformation.css';
import UserCard from './UserCard';

const ShowInformation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchUserInfo();
    }, [id]);

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
            <UserCard user={userInfo} />
        </div>
    );
};
export default ShowInformation;
