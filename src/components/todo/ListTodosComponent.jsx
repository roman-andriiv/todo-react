import {useEffect, useState} from "react"
import {deleteTodoApi, getAllTodosForUserApi} from "./api/TodoService"
import {useAuth} from "./security/AuthContext"
import {useNavigate} from "react-router-dom"
import Button from '@mui/material/Button'
import {IconButton} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export function ListTodosComponent() {

    const authContext = useAuth()
    const username = authContext.username
    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)
    useEffect(() => refreshTodos(), [])
    const navigate = useNavigate()

    function refreshTodos() {
        getAllTodosForUserApi(username)
            .then(response => {
                setTodos(response.data)
            })
            .catch(error => console.log(error))

    }

    function deleteTodo(id) {
        console.log(id)
        deleteTodoApi(username, id)
            .then(() => {
                setMessage(`Delete of Todo with id = ${id} successful`)
                refreshTodos()
            })
            .catch(error => console.log(error))
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`)
    }

    function addTodo() {
        navigate(`/todo/-1`)

    }

    return (
        <div className="container">
            <Button variant="contained" className="btn btn-success m-5" onClick={addTodo}> New ToDo</Button>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Is done?</th>
                        <th>Target Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td>{todo.done.toString()}</td>
                            <td>{todo.targetDate}</td>
                            <td>
                                <IconButton onClick={() => deleteTodo(todo.id)}>
                                    <DeleteIcon color="error"/>
                                </IconButton>
                            </td>
                            <td>
                                <IconButton onClick={() => updateTodo(todo.id)}>
                                    <EditIcon color="primary"/>
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>)
}