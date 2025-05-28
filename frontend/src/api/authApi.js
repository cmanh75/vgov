import axios from 'axios';

const API_URL = 'http://localhost:9090/api/auth';

// Đăng nhập
export const login = (loginData) => axios.post(`${API_URL}/login`, loginData);
