import {apiClient} from "./ApiClient"

export const getAllTodosForUserApi = (username) => apiClient.get(`/${username}/todos`)

export const deleteTodoApi = (username, id) => apiClient.delete(`/${username}/todos/${id}`)
export const getTodoApi = (username, id) => apiClient.get(`/${username}/todos/${id}`)

export const updateTodoApi = (username, id, todo) => apiClient.put(`/${username}/todos/${id}`, todo)
export const createTodoApi = (username, todo) => apiClient.post(`/${username}/todos`, todo)
