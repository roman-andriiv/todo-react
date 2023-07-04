import {useEffect, useState} from "react"
import {deleteTodoApi, getAllTodosForUserApi} from "./api/TodoService"
import {useAuth} from "./security/AuthContext"
import {useNavigate} from "react-router-dom"
import Button from '@mui/material/Button'
import {IconButton, Snackbar} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {DataGrid, gridClasses, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid"

export function ListTodosComponent() {

    const authContext = useAuth()
    const username = authContext.username
    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)
    useEffect(() => refreshTodos(), [])
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    function refreshTodos() {
        getAllTodosForUserApi(username)
            .then(response => {
                setTodos(response.data)
            })
            .catch(error => console.log(error))

    }

    function deleteTodo(id) {
        console.log(id)
        if (window.confirm("Are you sure to delete?")) {
            deleteTodoApi(username, id)
                .then(() => {
                    // setMessage(`Delete of Todo with id = ${id} successful`)
                    setOpen(true)
                    refreshTodos()
                })
                .catch(error => console.log(error))
        }

    }

    function updateTodo(id) {
        navigate(`/todo/${id}`)
    }

    function addTodo() {
        navigate(`/todo/-1`)

    }

    const columns = [
        {field: 'description', headerName: 'Description', width: 350,},
        {field: 'done', headerName: 'Is Done', width: 350},
        {field: 'targetDate', headerName: 'Target Date', width: 350},
        {
            field: 'edit', headerName: '', sortable: false, filterable: false,
            renderCell: row => <IconButton onClick={() => updateTodo(row.id)}>
                <EditIcon color="primary"/>
            </IconButton>
        },
        {
            field: 'delete', headerName: '', sortable: false, filterable: false,
            renderCell: row => <IconButton onClick={() => deleteTodo(row.id)}>
                <DeleteIcon color="error"/>
            </IconButton>
        }
    ]

    function CustomToolbar() {
        return (
            <GridToolbarContainer
                className={gridClasses.toolbarContainer}>
                <GridToolbarExport/>
            </GridToolbarContainer>
        )
    }

    return (<div className="container">
        <Button variant="contained" className="btn btn-success m-5" onClick={addTodo}> New ToDo</Button>
        {message && <div className="alert alert-warning">{message}</div>}
        <div style={{height: 500, width: '100%'}}>
            <DataGrid
                disableSelectionOnClick={true}
                rows={todos}
                columns={columns}
                getRowId={row => row.id}
                components={{Toolbar: CustomToolbar}}/>
        </div>
        {/*<div>*/}
        {/*    <table className="table">*/}
        {/*        <thead>*/}
        {/*        <tr>*/}
        {/*            <th>Description</th>*/}
        {/*            <th>Is done?</th>*/}
        {/*            <th>Target Date</th>*/}
        {/*            <th></th>*/}
        {/*            <th></th>*/}
        {/*        </tr>*/}
        {/*        </thead>*/}
        {/*        <tbody>*/}
        {/*        {todos.map(todo => (*/}
        {/*            <tr key={todo.id}>*/}
        {/*                <td>{todo.description}</td>*/}
        {/*                <td>{todo.done.toString()}</td>*/}
        {/*                <td>{todo.targetDate}</td>*/}
        {/*                <td>*/}
        {/*                    <IconButton onClick={() => deleteTodo(todo.id)}>*/}
        {/*                        <DeleteIcon color="error"/>*/}
        {/*                    </IconButton>*/}
        {/*                </td>*/}
        {/*                <td>*/}
        {/*                    <IconButton onClick={() => updateTodo(todo.id)}>*/}
        {/*                        <EditIcon color="primary"/>*/}
        {/*                    </IconButton>*/}
        {/*                </td>*/}
        {/*            </tr>*/}
        {/*        ))}*/}
        {/*        </tbody>*/}
        {/*    </table>*/}
        {/*</div>*/}
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
            message="Todo deleted"
        />
    </div>)
}