/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Task.css";

const Task = ({ task, onRemove }) => (
  <li className="task-li">
    <input
      type="checkbox"
      id={`checkbox_${task.id}`}
      checked={task.isCompleted}
    ></input>
    <label
      for={`checkbox_${task.id}`}
      className={task.isCompleted ? "striked" : ""}
    >
      {task.title}
    </label>
    <a data-uk-icon="trash" onClick={onRemove}></a>
  </li>
);

export default Task;
