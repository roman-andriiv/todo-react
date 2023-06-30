import {useNavigate, useParams} from "react-router-dom"
import {useAuth} from "./security/AuthContext"
import Button from "@mui/material/Button"

export function WelcomeComponent() {
    const {username} = useParams()
    const authContext = useAuth()
    const navigate = useNavigate()


    function callWelcome() {
        navigate('/todos')
        // axios.get('http://localhost:3000/todos')
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome to the "ToDos" ReactJS application</h1>
            <div>You are logged in as "{username}"</div>
            <Button variant="contained" className="btn-success btn m-5" onClick={callWelcome}>My Todos</Button>
        </div>
    )
}