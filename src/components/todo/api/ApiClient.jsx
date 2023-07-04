import axios from "axios"

export const apiClient = axios.create(
    // {baseURL: 'http://localhost:8080'}
    {baseURL: 'http://todo-env.eba-hqc8ajdp.eu-central-1.elasticbeanstalk.com/'}
)