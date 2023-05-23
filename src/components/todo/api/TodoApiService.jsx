import axios from "axios";

const apiClient = axios.create(
    {baseURL: 'http://localhost:8080'}
);

export const getAllTodosForUser = (username) => apiClient.get(`/users/${username}/todos`);

export const removeTodo = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`);