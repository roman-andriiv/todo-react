import "./TodoApp.css";
import {useState} from "react";
import {BrowserRouter, Link, Route, Routes, useNavigate, useParams} from "react-router-dom";

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <HeaderComponent/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginComponent/>}></Route>
                    <Route path="/login" element={<LoginComponent/>}></Route>
                    <Route path="/welcome/:username" element={<WelcomeComponent/>}></Route>
                    <Route path="/todos" element={<ListTodosComponent/>}></Route>
                    <Route path="/logout" element={<LogoutComponent/>}></Route>
                    <Route path="*" element={<ErrorComponent/>}></Route>
                </Routes>
            </BrowserRouter>
            <FooterComponent/>
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
            <h1>Welcome to the "ToDos" ReactJS application</h1>
            <div>You are logged in as {username}</div>
            <div>Your ToDos are <Link to="/todos">here</Link></div>
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

function HeaderComponent() {
    return (
        <div className="header">
            Header
            <hr/>
        </div>
    );
}

function FooterComponent() {
    return (
        <div className="footer">
            <hr/>
            Footer
        </div>
    );
}

function LogoutComponent() {
    return (
        <div className="LogoutComponent">
            <h1>You are logged out</h1>
            <div>Thank You for using 'ToDos' app</div>
        </div>
    );
}

function ListTodosComponent() {
    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay());
    const todos = [
        {id: 1, description: 'Test1', done: false, targetDate: targetDate},
        {id: 2, description: 'Test2', done: false, targetDate: targetDate},
        {id: 3, description: 'Test3', done: false, targetDate: targetDate},
    ];
    return (
        <div className="container">
            <h1>Things You want to do:</h1>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Description</td>
                        <td>Is done?</td>
                        <td>Target Date</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toDateString()}</td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
