import React, { useEffect, useState } from "react";
import axios from "axios";

import TaskItem from "./TaskItem";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskUpdate,setTaskUpdate]=useState(false)


  useEffect(() => {
    const apiUrl =
      "https://reacttaskmanager-829b9-default-rtdb.firebaseio.com/tasks.json";

    axios
    .get(apiUrl).then((response) => {
      if (response.data) {
        setTasks(Object.values(response.data));
      }
    });
  },[taskUpdate]);//taskUpdate kiyna variable eka wenas sunoth me useEffect eka trigger wenwa


  const handleComplete=(taskId)=>{
    const apiUrl =
    `https://reacttaskmanager-829b9-default-rtdb.firebaseio.com/tasks/${taskId}.json`;

    axios.patch(apiUrl,{status:"Completed"}).then(res=>{
      setTaskUpdate(!taskUpdate)
    })
  }

  const handleDelete = (taskId) => {
    const apiUrl =
    `https://reacttaskmanager-829b9-default-rtdb.firebaseio.com/tasks/${taskId}.json`;

    axios.delete(apiUrl).then(res=>{
      setTaskUpdate(!taskUpdate)
    })
  }

  const displayTasks = () => {
    return tasks.map((task) => {
      return <TaskItem key={task.id} taskInfo={task} onComplete={handleComplete} onDelete={handleDelete} />;
    });
  };

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-3">{displayTasks()}</div>
    </div>
  );
}

export default TodoList;
