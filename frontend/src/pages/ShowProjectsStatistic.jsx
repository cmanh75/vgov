import React, { useState, useEffect } from 'react';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import { getAllProjects } from '../api/projectApi';
import './css/ShowStatistic.css';
import { useNavigate } from 'react-router-dom';

const ShowStatistics = () => {
    const [projects, setProjects] = useState([]);
    const [type, setType] = useState('');
    const [data, setData] = useState({});
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const fetchProjects = async () => {
        try {
            const response = await getAllProjects(null,token);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleTypeChange = (type) => {
        setType(type);
        let groupedProjects = {};
        if (type === 'status') {
            groupedProjects = projects.reduce((acc, project) => {
                const status = project.status || 'Khác';
                if (!acc[status]) acc[status] = 0;
                acc[status] += 1;
                return acc;
            }, {});
        } else {
            groupedProjects = projects.reduce((acc, project) => {
                const type = project.type || 'Khác';
                if (!acc[type]) acc[type] = 0;
                acc[type] += 1;
                return acc;
            }, {});
        }
        const currentData = {
            labels: Object.keys(groupedProjects),
            datasets: [{
                label: 'Số lượng dự án',
                data: Object.values(groupedProjects),
                backgroundColor: [
                    '#6c5ce7', '#00b894', '#fdcb6e', '#00bcd4', '#ff7675', '#636e72', '#a29bfe', '#ffeaa7'
                ],
                borderColor: '#fff',
                borderWidth: 2,
            }]
        }
        setData(currentData);
    };

    return (
        <div className="statistic-wrapper">
            <button className="home-button-statistic" onClick={() => navigate('/')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '10px', border: '2px solid #e9ecef', backgroundColor: 'white', color: '#2d3436', cursor: 'pointer', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
            >
                <i className="fas fa-home" style={{ fontSize: '1.2rem', color: '#6c5ce7' }}></i>
                <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#2d3436' }}>Trang chủ</span>
            </button>
            <h1 className="statistic-title">Thống kê dữ liệu dự án</h1>
            <div className="statistic-filter-row">
                <label>Cơ cấu theo:</label>
                <select className="statistic-select" value={type} onChange={(e) => handleTypeChange(e.target.value)}>
                    <option value="">Chọn cơ cấu</option>
                    <option value="status">Theo trạng thái</option>
                    <option value="type">Theo loại</option>
                </select>
            </div>
            {data && data.labels && data.labels.length > 0 && (
                <div className="statistic-charts-row">
                    <div className="statistic-card">
                        <PieChart data={data} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowStatistics;
