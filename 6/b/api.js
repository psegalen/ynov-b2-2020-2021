const crudfulConfig = {
  headers: {
    cfAccessKey: "75ca4ddbde8291858f35dfc4b8b75f7b45e40700",
  },
};

export const getTasks = () =>
  axios
    .get("https://todo.crudful.com/tasks", crudfulConfig)
    .then((result) => result.data.results);

export const setTaskIsCompleted = (taskId, isCompleted) =>
  axios.patch(
    `https://todo.crudful.com/tasks/${taskId}`,
    { isCompleted: isCompleted },
    crudfulConfig
  );

export const deleteTask = (taskId) =>
  axios.delete(
    `https://todo.crudful.com/tasks/${taskId}`,
    crudfulConfig
  );

export const createTask = (title) =>
  axios.post(
    "https://todo.crudful.com/tasks",
    { title: title },
    crudfulConfig
  );
