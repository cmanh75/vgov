import React, { useEffect, useState } from 'react';
import { getProjectById } from '../api/projectApi';
import { useParams } from 'react-router-dom';

const ShowProject = () => {

    const [project, setProject] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await getProjectById(id);
                setProject(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin dự án:', error);
            }
        };
        fetchProject();
    }, [id]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Thông tin dự án</h1>
            <p>Tên dự án: {project.name}</p>
            <p>Mã dự án: {project.code}</p>
            <p>Ngày bắt đầu: {project.startDate}</p>
            <p>Ngày kết thúc: {project.endDate}</p>
            <p>Trạng thái: {project.status}</p>
        </div>
    );
};

export default ShowProject;