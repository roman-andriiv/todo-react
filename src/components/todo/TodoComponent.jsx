import {useNavigate, useParams} from "react-router-dom"
import {createTodoApi, getTodoApi, updateTodoApi} from "./api/TodoService"
import {useAuth} from "./security/AuthContext"
import {useEffect, useState} from "react"
import moment from "moment"
import Button from "@mui/material/Button"
import {ErrorMessage, Field, Form, Formik} from "formik"

export default function TodoComponent() {

    const {id} = useParams()

    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const [done, setDone] = useState('')

    const authContext = useAuth()
    const navigate = useNavigate()

    const username = authContext.username

    useEffect(() =>
        getTodos(), [id])


    function getTodos() {
        if (id != -1) {
            getTodoApi(username, id)
                .then(response => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                    setDone(response.data.done)
                })
                .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        console.log(values)
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: values.done
        }
        console.log(todo)

        if (id == -1) {
            createTodoApi(username, todo)
                .then(response => {
                    console.log(response)
                    navigate('/todos')
                })
                .catch(error => console.log(error))
        } else {
            updateTodoApi(username, id, todo)
                .then(response => {
                    console.log(response)
                    navigate('/todos')
                })
                .catch(error => console.log(error))
        }
    }

    function validate(values) {
        let errors = {}
        if (values.description.length < 2) {
            errors.description = 'Enter at least 2 characters'
        }
        if (values.targetDate == null || values.targetDate === '' || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a target date'
        }
        // if (values.done !== true || values.done !== false) {
        //     errors.done = `Enter \'true\' or \'false\'`
        // }
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Todo details</h1>
            <div>
                <Formik initialValues={{description, targetDate, done}}
                        enableReinitialize={true}
                        onSubmit={onSubmit}
                        validate={validate}
                        validateOnChange={false}
                        validateOnBlur={false}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="done" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Is Done? (true/false)</label>
                                    <Field type="boolean" className="form-control" name="done"/>
                                </fieldset>
                                <div>
                                    <Button type="submit" variant="contained">Save</Button>
                                </div>
                                {/*<Stack spacing={2} mt={1}>*/}
                                {/*    <TextField label="Descriprion" name="desc"*/}
                                {/*               autoFocus*/}
                                {/*               variant="standard"/>*/}
                                {/*    <TextField label="Target Date" name="targetDate"*/}
                                {/*               autoFocus*/}
                                {/*               variant="standard" type={"date"}/>*/}
                                {/*    <TextField label="Done? true/false" name="Done"*/}
                                {/*               autoFocus*/}
                                {/*               variant="standard"/>*/}
                                {/*</Stack>*/}

                            </Form>
                        )
                    }
                </Formik>

            </div>
        </div>
    )
}