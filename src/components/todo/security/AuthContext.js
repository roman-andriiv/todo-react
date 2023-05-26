import {createContext, useContext, useState} from "react"
import {executeBasicAuthService} from "../api/BasicAuthService"
import {apiClient} from "../api/ApiClient"

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({children}) {

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)


    async function login(username, password) {

        const baToken = 'Basic ' + window.btoa(username + ":" + password)
        const response = await executeBasicAuthService(baToken)

        try {
            if (response.status === 200) {
                setAuthenticated(true)
                setUsername(username)
                setToken(baToken)
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = baToken
                        return config
                    }
                )
                return true
            } else {
                logout()
                return false
            }
        } catch (error) {
            logout()
            return false
        }
    }

    function logout() {
        setUsername(null)
        setAuthenticated(false)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    )

}
