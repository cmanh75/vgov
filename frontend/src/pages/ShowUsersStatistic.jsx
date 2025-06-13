import { useState, useEffect } from 'react';
import { getAllUsersForStatistic } from '../api/userApi';
import { useLocation, useNavigate } from 'react-router-dom';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import './css/ShowStatistic.css';
import { getAllProjects } from '../api/projectApi';
import { jwtDecode } from 'jwt-decode';



const ShowUsersStatistic = () => {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState({});
    const [type, setType] = useState('');
    const token = localStorage.getItem('token');
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const projectId = query.get('projectId');
    const [categoryProject, setCategoryProject] = useState({});
    const navigate = useNavigate();
    let userId = null;
    if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.userId;
    }

    const loadData = async () => {
        await fetchProjects();
        await fetchUsers();
    };
    useEffect(() => {
        loadData();
    }, []);

    const fetchAllUsersForProject = async (projects) => {
        for (const project of projects) {
            const response = await getAllUsersForStatistic(project.id, token);
            const length = response.data.length;
            categoryProject[project.id] = length;
        }
        setCategoryProject(categoryProject);
    }

    const fetchProjects = async () => {
        try {
            const response = await getAllProjects(null, token);
            await fetchAllUsersForProject(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };
    const fetchUsers = async () => {
        try {
            const response = await getAllUsersForStatistic(projectId, token);
            if (projectId) {
                setUsers(response.data);
            } else {
                setUsers(response.data.slice(1, response.data.length));
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleTypeChange = (type) => {
        const selection = type;
        let groupedUsers = {};
        setType(selection);
        console.log(categoryProject);
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
            groupedUsers = categoryProject;
        }
        console.log(users);
        const currentData = {
            labels: Object.keys(groupedUsers),
            datasets: [{
                label: 'Số lượng người dùng',
                data: Object.values(groupedUsers),
            }],
        };
        console.log(currentData);
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
            <h1 className="statistic-title">Thống kê dữ liệu nhân viên</h1>
            <div className="statistic-filter-row">
                <label>Cơ cấu theo:</label>
                <select className="statistic-select" value={type} onChange={(e) => handleTypeChange(e.target.value) }>
                    <option value="">Chọn cơ cấu</option>
                    <option value="role">Theo vai trò</option>
                    <option value="gender">Theo giới tính</option>
                    {!projectId && <option value="project">Theo dự án</option>}
                </select>
            </div>
            {data && data.labels && data.labels.length > 0 && (
                <div className="statistic-charts-row">
                    <div className="statistic-card">
                        {type === 'project' ? (
                            <BarChart data={data} />
                        ) : (
                            <PieChart data={data} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowUsersStatistic;
