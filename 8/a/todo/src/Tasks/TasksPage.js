import { useEffect, useState } from "react";
import { getTasks, deleteTask, setTaskIsCompleted } from "../api";
import Task from "./Task";

const updateTaskInState = (tasks, newTask) => {
  const newTasks = tasks.slice();
  for (let i = 0; i < newTasks.length; i++) {
    const task = newTasks[i];
    if (task.id === newTask.id) {
      newTasks[i] = newTask;
      break;
    }
  }
  return newTasks;
};

/* eslint-disable jsx-a11y/anchor-is-valid */
const TasksPage = ({ listId }) => {
  // Declare a state that will contain tasks data
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Use an effect that will fetch tasks data on API
  useEffect(() => {
    setIsLoading(true);
    getTasks(listId).then((apiTasks) => {
      setTasks(apiTasks);
      setIsLoading(false);
    });
  }, [listId]);

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
  const toggleIsCompleted = (oldTask) => {
    // Call API route
    setTaskIsCompleted(oldTask.id, !oldTask.isCompleted).then(
      (newTask) => {
        //Update state
        setTasks(updateTaskInState(tasks, newTask));
      }
    );
  };

  // Create panel body according to loading state
  const panelBody = isLoading ? (
    <div data-uk-spinner />
  ) : (
    <ul className="uk-list uk-list-large uk-list-divider">
      {tasks.map((task) => (
        <Task
          task={task}
          onRemove={() => removeTask(task.id)}
          onToggle={() => toggleIsCompleted(task)}
        />
      ))}
    </ul>
  );

  return (
    <div>
      <h1>Mes choses à faire</h1>
      <hr />
      <div className="App-panel">{panelBody}</div>
      <a>+ Nouvelle tâche</a>
    </div>
  );
};

export default TasksPage;
