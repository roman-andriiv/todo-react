import {Link, useParams} from "react-router-dom";

export function WelcomeComponent() {
    const {username} = useParams();
    console.log(username);

    return (
        <div className="WelcomeComponent">
            <h1>Welcome to the "ToDos" ReactJS application</h1>
            <div>You are logged in as {username}</div>
            <div>Your ToDos are <Link to="/todos">here</Link></div>
        </div>
    );
}