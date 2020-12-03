/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { deleteTask, getTasks } from "../api";
import Task from "./Task";
import "./TasksPage.css";

const TasksPage = (props) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getTasks(props.listId).then((apiTasks) => {
      setTasks(apiTasks);
      setIsLoading(false);
    });
  }, [props.listId]);
  const removeTask = (taskId) => {
    deleteTask(taskId).then(() => {
      const newTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(newTasks);
    });
  };
  const panel = isLoading ? (
    <div data-uk-spinner />
  ) : (
    tasks.map((task) => (
      <Task task={task} onDelete={() => removeTask(task.id)} />
    ))
  );
  return (
    <div>
      <h1>Mes choses à faire</h1>
      <hr />
      <div className="App-panel">{panel}</div>
      <a>+ Nouvelle tâche</a>
    </div>
  );
};

export default TasksPage;
