import "./TodoApp.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LogoutComponent} from "./LogoutComponent";
import {LoginComponent} from "./LoginComponent";
import {WelcomeComponent} from "./WelcomeComponent";
import {HeaderComponent} from "./HeaderComponent";
import {FooterComponent} from "./FooterComponent";
import {ErrorComponent} from "./ErrorComponent";
import {ListTodosComponent} from "./ListTodosComponent";

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path="/" element={<LoginComponent/>}></Route>
                    <Route path="/login" element={<LoginComponent/>}></Route>
                    <Route path="/welcome/:username" element={<WelcomeComponent/>}></Route>
                    <Route path="/todos" element={<ListTodosComponent/>}></Route>
                    <Route path="/logout" element={<LogoutComponent/>}></Route>
                    <Route path="*" element={<ErrorComponent/>}></Route>
                </Routes>
                <FooterComponent/>
            </BrowserRouter>
        </div>

    );
}