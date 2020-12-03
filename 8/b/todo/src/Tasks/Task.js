/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
const Task = (props) => (
  <div>
    <input type="checkbox" id={`checkbox_${props.task.id}`}></input>
    <label for={`checkbox_${props.task.id}`}>
      {props.task.title}
    </label>
    <a data-uk-icon="trash" onClick={props.onDelete} />
  </div>
);

export default Task;
