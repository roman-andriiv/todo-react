import "./TodoApp.css";
import {useState} from "react";

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <LoginComponent/>
        </div>

    );
}

function LoginComponent() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

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
