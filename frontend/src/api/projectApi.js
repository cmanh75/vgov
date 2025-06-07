import axios from 'axios';

const API_URL = 'http://localhost:9090/api/projects';

// Lấy tất cả project
export const getAllProjects = (informationId, token) =>
  axios.get(`${API_URL}?informationId=${informationId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Lấy project theo id
export const getProjectById = (id, token) =>
  axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Tạo project mới (chỉ ADMIN mới được phép)
export const createProject = (projectData, token) =>
  axios.post(API_URL, projectData, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Cập nhật project
export const updateProject = (id, projectData, token) =>
  axios.put(`${API_URL}/${id}`, projectData, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Xóa project
export const deleteProject = (id, token) =>
  axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Nếu có đăng ký:
// export const register = (registerData) => axios.post(`${API_URL}/register`, registerData);
