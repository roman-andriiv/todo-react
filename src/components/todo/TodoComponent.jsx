import {useParams} from "react-router-dom";
import {getTodoApi} from "./api/TodoApiService";
import {useAuth} from "./security/AuthContext";
import {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";

export default function TodoComponent() {

    const {id} = useParams();
    const authContext = useAuth();
    const username = authContext.username;
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');

    useEffect(() => getTodos(), [id]);

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
    }

    return (
        <div className="container">
            <h1>Enter Todo details</h1>
            <div>
                <Formik initialValues={{description, targetDate}} enableReinitialize={true} onSubmit={onSubmit}>
                    {
                        (props) => (
                            <Form>
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