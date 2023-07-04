import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useAuth} from "./security/AuthContext"
import Button from "@mui/material/Button"
import {Stack, TextField} from "@mui/material"

export function LoginComponent() {

    const [username, setUsername] = useState('andriiv')
    const [password, setPassword] = useState('password')

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()


    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleSubmit() {
        if (await authContext.login(username, password)) {
            navigate(`/welcome/${username}`)
        } else {
            setShowErrorMessage(true)
        }
    }

    return (
        // <div className="Login">
        //     {showErrorMessage &&
        //         <div className="errorMessage text-danger">Authenticated failed. Please check your credentials</div>}
        //
        //     <div className="LoginForm">
        //         <div>
        //             <label>Username</label>
        //             <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
        //         </div>
        //         <div>
        //             <label>Password</label>
        //             <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
        //         </div>
        //         <div>
        //             {/*<button className="btn btn-primary" type="button" name="login" onClick={handleSubmit}>login</button>*/}
        //             <Button variant="contained" className="btn-success btn m-5" onClick={handleSubmit}>login</Button>
        //         </div>
        //     </div>
        // </div>
        <div>
            <Stack spacing={2} alignItems="center" mt={5}>
                <TextField
                    name="username"
                    label="Username"
                    value={username}
                    onChange={handleUsernameChange}/>
                <TextField
                    type="password"
                    name="password"
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}/>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSubmit}>
                    Login
                </Button>
            </Stack>
        </div>
    )
}