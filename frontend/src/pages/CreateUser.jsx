import React, { useState, useEffect } from 'react';
import '../pages/css/CreateUser.css';
import { getAllProjects } from '../api/projectApi';
import { createUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import UpdateUser from './UpdateUser';

const CreateUser = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        gender: '',
        birthDate: '',
        projectId: ''
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

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getAllProjects(token);
                if (response && response.data) {
                    setAllProject(response.data);
                }
            } catch (error) {
                console.error('Lỗi khi tải danh sách dự án:', error);
                setError('Không thể tải danh sách dự án');
            }
        };

        fetchProjects();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name: user.name,
            email: user.email,
            password: user.password,
            projectId: user.projectId,  
            role: user.role,
            gender: user.gender,
            dob: user.birthDate
        };

        try {
            const response = await createUser(userData, token);
            console.log('Tạo người dùng thành công:', response);
            navigate('/');
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
            allProject={allProject}
            onCancel={onCancel}
        />
    );
};

export default CreateUser;
