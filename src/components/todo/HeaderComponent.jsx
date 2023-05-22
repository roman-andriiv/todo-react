import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "./security/AuthContext";

export function HeaderComponent() {

    const authContext = useContext(AuthContext);
    console.log(authContext.number);

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
                                <li className="nav-item fs-5"><Link className="nav-link"
                                                                    to="/welcome/andriiv">Home</Link>
                                </li>
                                <li className="nav-item fs-5"><Link className="nav-link" to="/todos">ToDos</Link>
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5"><Link className="nav-link" to="/logout">Log out</Link></li>
                            <li className="nav-item fs-5"><Link className="nav-link" to="/login">Log in</Link></li>
                        </ul>
                    </nav>
                </div>

            </div>
        </header>
    );
}