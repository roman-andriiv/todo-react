import {Link, useParams} from "react-router-dom"
import axios from "axios"
import {useAuth} from "./security/AuthContext"

export function WelcomeComponent() {
    const {username} = useParams()
    const authContext = useAuth()

    function callWelcome() {
        axios.get('http://localhost:8080/')
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome to the "ToDos" ReactJS application</h1>
            <div>You are logged in as {username}</div>
            <div>Your ToDos are <Link to="/todos">here</Link></div>
            <div>
                <button className="btn-success btn m-5" onClick={callWelcome}> Call Welcome</button>
            </div>
        </div>
    )
}