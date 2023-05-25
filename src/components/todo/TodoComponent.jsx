import {useNavigate, useParams} from "react-router-dom";
import {getTodoApi, updateTodoApi} from "./api/TodoApiService";
import {useAuth} from "./security/AuthContext";
import {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";

export default function TodoComponent() {

    const {id} = useParams();
    const authContext = useAuth();
    const username = authContext.username;
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');

    useEffect(() => getTodos(), [id]);
    const navigate = useNavigate();


    function getTodos() {
        getTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description);
                setTargetDate(response.data.targetDate);
            })
            .catch(error => console.log(error));
    }

    function onSubmit(values) {
        console.log(values);
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        };
        console.log(todo);
        updateTodoApi(username, id, todo)
            .then(response => {
                console.log(response);
                navigate('/todos');
            })
            .catch(error => console.log(error));
    }

    function validate(values) {
        let errors = {};
        if (values.description.length < 2) {
            errors.description = 'Enter at least 2 characters';
        }
        if (values.targetDate == null) {
            errors.targetDate = 'Enter a target date';
        }
        return errors;
    }

    return (
        <div className="container">
            <h1>Enter Todo details</h1>
            <div>
                <Formik initialValues={{description, targetDate}}
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
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-3" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    );
}