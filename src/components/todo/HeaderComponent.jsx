import {Link} from "react-router-dom"
import {useAuth} from "./security/AuthContext"
import {AppBar, Toolbar} from "@mui/material"

export function HeaderComponent() {

    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated

    function logout() {
        authContext.logout()
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <div className="container">
                    <div className="row">
                        <nav className="navbar navbar-expand-lg">
                            <a className="navbar-brand ms-2 fs-2 fw-bold"
                               href="https://github.com/roman-andriiv/todo-react-springboot-app">
                                ToDos (Github source) </a>
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav">
                                    <li className="nav-item fs-5">
                                        {isAuthenticated &&
                                            <Link className="nav-link" to="/welcome/andriiv">Home</Link>}
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
            </Toolbar>
        </AppBar>
    )
}