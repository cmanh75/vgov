import axios from 'axios';

const API_URL = 'http://127.0.0.1:9090/api/information';

// Lấy tất cả user
export const getAllUsers = (query, roleFilter, page, projectId, userId, token) =>
    axios.get(API_URL, {
        params: { 
            querySearch: query, 
            roleFilter: roleFilter, 
            page: page, 
            projectId: projectId, 
            userId: userId 
        },
        headers: { Authorization: `Bearer ${token}` }
    });

// Lấy tất cả user
export const getAllUsersForStatistic = (projectId, token) =>
    axios.get(`${API_URL}/statistic`, {
        params: { 
            projectId: projectId, 
        },
        headers: { Authorization: `Bearer ${token}` }
    });

// Lấy user theo id
export const getUserById = (id, token) =>
    axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

// Tạo user
export const createUser = (userData, token) =>
    axios.post(API_URL, userData, {
        headers: { Authorization: `Bearer ${token}` }
    });

// Cập nhật user
export const updateUser = (id, userData, token) =>
    axios.put(`${API_URL}/${id}`, userData, {
        headers: { Authorization: `Bearer ${token}` }
    });

// Xóa user
export const deleteUser = (id, token) =>
    axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const getUserByEmail = (email, token) =>
    axios.get(`${API_URL}/email?email=${email}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
