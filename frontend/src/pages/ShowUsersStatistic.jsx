import { useState, useEffect } from 'react';
import { getAllUsers } from '../api/userApi';
import { useLocation } from 'react-router-dom';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import './css/ShowStatistic.css';
import { getAllProjects } from '../api/projectApi';



const ShowUsersStatistic = () => {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState({});
    const [projects, setProjects] = useState([]);
    const [nameProjects, setNameProjects] = useState({});
    const [type, setType] = useState('');
    const [categoryUsers, setCategoryUsers] = useState([]);
    const token = localStorage.getItem('token');
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const projectId = query.get('projectId');

    const loadData = async () => {
        await fetchProjects();
        await fetchUsers();
    };
    useEffect(() => {
        loadData();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await getAllProjects(token);
            setProjects(response.data);
            Object.keys(projects).forEach((project) => {
                setNameProjects((prev) => ({ ...prev, [project.id]: project.name }));
            });
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };
    const fetchUsers = async () => {
        try {
            const response = await getAllUsers(projectId, token);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleTypeChange = (type) => {
        const selection = type;
        let groupedUsers = {};
        setType(selection);
        if (selection === 'role') {
            groupedUsers = users.reduce((acc, user) => {
                const role = user.role || 'Khác';
                if (!acc[role]) acc[role] = 0;
                acc[role] += 1;
                return acc;
            }, {});
        }
        if (selection === 'gender') {
            groupedUsers = users.reduce((acc, user) => {
                const gender = user.gender || 'Khác';
                if (!acc[gender]) acc[gender] = 0;
                acc[gender] += 1;
                return acc;
            }, {});
        }
        if (selection === 'project') {
            groupedUsers = users.reduce((acc, user) => {
                const project = nameProjects[user.projectId] || 'Khác';
                if (!acc[project]) acc[project] = 0;
                acc[project] += 1;
                return acc;
            }, {});
        }
        setCategoryUsers(groupedUsers);
        const currentData = {
            labels: Object.keys(groupedUsers),
            datasets: [{
                label: 'Số lượng người dùng',
                data: Object.values(groupedUsers),
            }],
        };
        setData(currentData);
    };

    return (
        <div className="statistic-wrapper">
            <h1 className="statistic-title">Thống kê dữ liệu dự án</h1>
            <div className="statistic-filter-row">
                <label>Cơ cấu theo:</label>
                <select className="statistic-select" value={type} onChange={(e) => handleTypeChange(e.target.value) }>
                    <option value="">Chọn cơ cấu</option>
                    <option value="role">Theo vai trò</option>
                    <option value="gender">Theo giới tính</option>
                    <option value="project">Theo dự án</option>
                </select>
            </div>
            {data && data.labels && data.labels.length > 0 && (
                <div className="statistic-charts-row">
                    <div className="statistic-card">
                        <BarChart data={data} />
                    </div>
                    <div className="statistic-card">
                        <PieChart data={data} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowUsersStatistic;
