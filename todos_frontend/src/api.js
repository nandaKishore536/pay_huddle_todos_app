import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Groups
export const fetchGroups = async () => {
  const res = await axios.get(`${BASE_URL}/groups`);
  return res.data;
};

export const createGroup = async (name) => {
  const res = await axios.post(`${BASE_URL}/groups`, { name });
  return res.data;
}; 

export const updateGroup = (groupId, newTitle) => {
  return axios.put(`${BASE_URL}/groups/${groupId}`, { name: newTitle });
};


export const deleteGroup = async (groupId) => {
  const res = await axios.delete(`${BASE_URL}/groups/${groupId}`);
  return res.data;
};

// Tasks
export const addTask = (groupId, taskData) => {
  return axios.post(`http://localhost:5000/api/tasks/${groupId}`, taskData);
};

export const updateTask = (taskId, updatedData) => {
  return axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedData);
};


export const deleteTask = async (taskId) => {
  const res = await axios.delete(`${BASE_URL}/tasks/${taskId}`);
  return res.data;
};
