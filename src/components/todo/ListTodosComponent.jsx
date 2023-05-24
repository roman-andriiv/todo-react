import {useEffect, useState} from "react";
import {getAllTodosForUser, removeTodo} from "./api/TodoApiService";
import {useAuth} from "./security/AuthContext";

export function ListTodosComponent() {

    const authContext = useAuth();
    const username = authContext.username;

    const [todos, setTodos] = useState([]);

    const [message, setMessage] = useState(null);

    useEffect(() => refreshTodos(), []);

    function refreshTodos() {
        getAllTodosForUser(username)
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => console.log(error));

    }

    function deleteTodo(id) {
        console.log(id);
        removeTodo(username, id)
            .then(
                () => {
                    setMessage(`Delete of Todo with id = ${id} successful`);
                    refreshTodos();
                }
            )
            .catch(error => console.log(error));
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
                                        <button className="btn btn-warning"
                                                onClick={() => deleteTodo(todo.id)}>Delete
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