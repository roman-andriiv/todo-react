import "./TodoApp.css";
import {useState} from "react";
import {BrowserRouter, Route, Routes, useNavigate, useParams} from "react-router-dom";

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginComponent/>}></Route>
                    <Route path="/login" element={<LoginComponent/>}></Route>
                    <Route path="/welcome/:username" element={<WelcomeComponent/>}></Route>
                    <Route path="*" element={<ErrorComponent/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>

    );
}

function LoginComponent() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit() {
        if (username === 'andriiv' && password === 'password') {
            console.log('Success');
            setShowSuccessMessage(true);
            setShowErrorMessage(false);
            navigate(`/welcome/${username}`);
        } else {
            console.log('Failed');
            setShowSuccessMessage(false);
            setShowErrorMessage(true);
        }
    }

    return (
        <div className="Login">
            {showSuccessMessage && <div className="successMessage">Authenticated successfully</div>}
            {showErrorMessage &&
                <div className="errorMessage">Authenticated failed. Please check your credentials</div>}

            <div className="LoginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>login</button>
                </div>
            </div>
        </div>
    );
}

function WelcomeComponent() {
    const {username} = useParams();
    console.log(username);

    return (
        <div className="WelcomeComponent">
            <h1>Welcome to the "ToDo" ReactJS application</h1>
            <div>You are logged in as {username}</div>
        </div>
    );
}

function ErrorComponent() {
    return (
        <div className="ErrorComponent">
            <h1>We are working really hard</h1>
            <div>Apologize for 404.</div>
        </div>
    );
}
