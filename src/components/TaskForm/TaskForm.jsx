import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import {v4 as uuid4} from 'uuid'
import { Link} from "react-router-dom";


function TaskForm() {
  const [message,setMessage] = useState("")


  const initialValues = {
    title: "",
    description: "",
    dueDate: "",
  };

  const onSubmit = (values , {resetForm}) => {
    const taskId=uuid4();
    const apiUrl =
      `https://reacttaskmanager-829b9-default-rtdb.firebaseio.com/tasks/${taskId}.json`;
    const task = { ...values, createdDate: new Date(), id: taskId, status: "New" };
    axios
      .put(apiUrl, task)
      .then((res) => {
        if (res.status === 200) {
          setMessage("Data Saved successfully");
          resetForm({values:''})
        }
      })
      .catch((err) => {
        setMessage("Error occured")
      });
  };

  const validate = (values) => {
    {
      let errors = {};

      if (!values.title) {
        errors.title = "Title cannot be blank";
      }
      if (!values.description) {
        errors.description = "you must enter description";
      }
      if (!values.dueDate) {
        errors.dueDate = "you must enter due date";
      } else if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(values.dueDate)) {
        errors.dueDate = "Due date must be in dd/mm/yyyy format";
      }
      return errors;
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="container col-sm-8 mt-4">
      <h4 className="mb-4">New Task</h4>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="small text-danger">{formik.errors.title}</div>
          ) : (
            " "
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            rows="4"
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="small text-danger">{formik.errors.description}</div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="text"
            className="form-control"
            id="dueDate"
            name="dueDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dueDate}
          />
          {formik.touched.dueDate && formik.errors.dueDate ? (
            <div className="small text-danger">{formik.errors.dueDate}</div>
          ) : (
            ""
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {message?(<div className="alert alert-primary mt-4">{message} - click here to see <Link to="/">all tasks</Link> </div>):<div className="">{message}</div>}
    </div>
  );
}

export default TaskForm;
