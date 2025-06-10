import axios from "axios";

const API_URL = "http://localhost:9090/api/information-project";

export const addProjectByInformationId = (data, token) => {
  return axios.post(`${API_URL}/information`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const addInformationByProjectId = (data, token) => {
  return axios.post(`${API_URL}/project`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteByInformationIdAndProjectId = (informationId, projectId, token) => {
    return axios.delete(`${API_URL}`, {
      params: {
        informationId: informationId,
        projectId: projectId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
};
