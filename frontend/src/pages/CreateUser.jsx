import React, { useState, useEffect } from 'react';
import '../pages/css/CreateUser.css';
import { getAllProjects } from '../api/projectApi';
import { createUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import UpdateUser from './UpdateUser';
import { uploadImage } from '../api/imageApi';

const CreateUser = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [avatarFile, setAvatarFile] = useState(null);
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        role: '',
        gender: '',
        dob: '',
    });
    const [allProject, setAllProject] = useState([]);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onCancel = () => {
        navigate('/');
    };


    const handleAvatarChange = (e) => {
        setAvatarFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            projectId: user.projectId,  
            role: user.role,
            gender: user.gender,
            dob: user.dob
        };

        try {
            console.log(userData);
            const response = await createUser(userData, token);
            if (avatarFile) {
                await uploadImage(user.id, avatarFile, token);
            }
            console.log('Tạo người dùng thành công:', response);
            navigate('/users?&roleFilter=all&page=1&querySearch=');
        } catch (error) {
            console.error('Lỗi khi tạo người dùng:', error);
            setError('Không thể tạo người dùng. Vui lòng thử lại.');
        }
    };

    return (
        <UpdateUser
            user={user}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            isEdit={false}
            onCancel={onCancel}
            avatarFile={avatarFile}
            handleAvatarChange={handleAvatarChange}
        />
    );
};

export default CreateUser;
