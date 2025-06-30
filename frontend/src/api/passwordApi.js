import axios from 'axios';

const API_URL = 'http://localhost:9090/api/password';

export const changePassword = async (email, oldPassword, newPassword, token) => {
    const response = await axios.post(`${API_URL}/change`, { email, oldPassword, newPassword }, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
};

export const resetPassword = async (email) => {
    console.log("email: " + email);
    const response = await axios.post(`${API_URL}/reset`, { email });
    return response.data;
};