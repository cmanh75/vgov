import React, { useEffect, useState } from 'react';
import { getUserById } from '../api/userApi';
import { useParams } from 'react-router-dom';

const ShowInformation = () => {

    const [user, setUser] = useState(null);
    const { id } = useParams();
    const uppercaseId = id.toUpperCase();
    console.log(uppercaseId);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserById(id, token);
                setUser(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
            }
        };
        fetchUser();
    }, [id]);
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Thông tin người dùng</h1>
            <p>Tên: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Vai trò: {user.role}</p> 
            <p>Trạng thái: {user.gender}</p>
            <p>Ngày sinh: {user.dob}</p>
            <p>Thuộc dự án: {user.projectId}</p>
        </div>
    );
};

export default ShowInformation;