import axios from "axios"

export const apiClient = axios.create(
    {baseURL: 'http://localhost:8080'}
    // {baseURL: 'http://todo-app-env-1.eba-qqfuc9us.eu-west-3.elasticbeanstalk.com'}
)