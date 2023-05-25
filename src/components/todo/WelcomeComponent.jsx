import {Link, useParams} from "react-router-dom"
import axios from "axios"

export function WelcomeComponent() {
    const {username} = useParams()

    function callHelloWorld() {
        axios.get('http://localhost:8080/')
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome to the "ToDos" ReactJS application</h1>
            <div>You are logged in as {username}</div>
            <div>Your ToDos are <Link to="/todos">here</Link></div>
            <div>
                <button className="btn-success btn m-5" onClick={callHelloWorld}> Call Hello World</button>
            </div>
        </div>
    )
}