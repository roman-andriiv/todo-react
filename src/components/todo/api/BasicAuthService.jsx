import {apiClient} from "./ApiClient"

export const executeBasicAuthService = (token) => apiClient.get(`/basicAuth`, {
    headers: {
        Authorization: token
    }
})