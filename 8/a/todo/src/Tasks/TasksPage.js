import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../api";
import Task from "./Task";

/* eslint-disable jsx-a11y/anchor-is-valid */
const TasksPage = () => {
  // Declare a state that will contain tasks data
  const [tasks, setTasks] = useState([]);

  // Use an effect that will fetch tasks data on API
  useEffect(() => {
    getTasks().then((apiTasks) => setTasks(apiTasks));
  }, []);

  // Remove a task both in API and state
  const removeTask = (taskId) => {
    // Call API route
    deleteTask(taskId).then(() => {
      // Update state
      const newTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(newTasks);
    });
  };

  // Toggle the property isCompleted of a task
  const toggleIsCompleted = (taskId) => {
    const newTasks = tasks.slice();
    newTasks.forEach((task) => {
      if (task.id === taskId) {
        task.isCompleted = !task.isCompleted;
      }
    });
    setTasks(newTasks);
  };

  return (
    <div>
      <h1>Mes choses à faire</h1>
      <hr />
      <div className="App-panel">
        <ul className="uk-list uk-list-large uk-list-divider">
          {tasks.map((task) => (
            <Task
              task={task}
              onRemove={() => removeTask(task.id)}
              onToggle={() => toggleIsCompleted(task.id)}
            />
          ))}
        </ul>
      </div>
      <a>+ Nouvelle tâche</a>
    </div>
  );
};

export default TasksPage;
