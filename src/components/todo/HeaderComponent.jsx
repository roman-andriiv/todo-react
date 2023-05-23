import {Link} from "react-router-dom";
import {useAuth} from "./security/AuthContext";

export function HeaderComponent() {

    const authContext = useAuth();
    const isAuthenticated = authContext.isAuthenticated;

    function logout() {
        authContext.logout();
    }

    return (
        <header className="border-bottom border-info border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-info"
                           href="https://github.com/roman-andriiv/todo-react-app">
                            ToDosWithReact (Github source) </a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5">
                                    {isAuthenticated && <Link className="nav-link" to="/welcome/andriiv">Home</Link>}
                                </li>
                                <li className="nav-item fs-5">
                                    {isAuthenticated && <Link className="nav-link" to="/todos">ToDos</Link>}
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                                {!isAuthenticated && <Link className="nav-link" to="/login">Log in</Link>}
                            </li>
                            <li className="nav-item fs-5">
                                {isAuthenticated &&
                                    <Link className="nav-link" to="/logout" onClick={logout}>Log out</Link>}
                            </li>
                        </ul>
                    </nav>
                </div>

            </div>
        </header>
    );
}