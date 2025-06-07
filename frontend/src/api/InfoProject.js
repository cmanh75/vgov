import axios from "axios";

const API_URL = "http://localhost:8080/api/information-project";

export const addProjectByInformationId = (informationId, projectIds) => {
  return axios.post(`${API_URL}/information/${informationId}`, projectIds);
};

export const addInformationByProjectId = (projectId, informationIds) => {
  return axios.post(`${API_URL}/project/${projectId}`, informationIds);
};

export const deleteAllByInformationId = (informationId) => {    
    return axios.delete(`${API_URL}?informationId=${informationId}`);
};

export const deleteAllByProjectId = (projectId) => {
    return axios.delete(`${API_URL}?projectId=${projectId}`);
};

export const deleteByInformationIdAndProjectId = (informationId, projectId) => {
    return axios.delete(`${API_URL}?informationId=${informationId}&projectId=${projectId}`);
};
