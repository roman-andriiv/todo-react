import {useEffect, useState} from "react";
import {deleteTodoApi, getAllTodosForUserApi} from "./api/TodoApiService";
import {useAuth} from "./security/AuthContext";
import {useNavigate} from "react-router-dom";

export function ListTodosComponent() {

    const authContext = useAuth();
    const username = authContext.username;
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);
    useEffect(() => refreshTodos(), []);
    const navigate = useNavigate();

    function refreshTodos() {
        getAllTodosForUserApi(username)
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => console.log(error));

    }

    function deleteTodo(id) {
        console.log(id);
        deleteTodoApi(username, id)
            .then(
                () => {
                    setMessage(`Delete of Todo with id = ${id} successful`);
                    refreshTodos();
                }
            )
            .catch(error => console.log(error));
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`);
    }

    return (
        <div className="container">
            <h1>Things You want to do:</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Is done?</th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td>
                                        <button className="btn btn-danger"
                                                onClick={() => deleteTodo(todo.id)}>Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-success"
                                                onClick={() => updateTodo(todo.id)}>Update
                                        </button>
                                    </td>
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