const crudfulConfig = {
  headers: {
    cfAccessKey: "75ca4ddbde8291858f35dfc4b8b75f7b45e40700",
  },
};

export const getTasks = (listId) =>
  axios
    .get(
      `https://todo.crudful.com/tasks?listId=${listId}`,
      crudfulConfig
    )
    .then((result) => result.data.results);

export const setTaskIsCompleted = (taskId, isCompleted) =>
  axios
    .patch(
      `https://todo.crudful.com/tasks/${taskId}`,
      {
        isCompleted: isCompleted,
      },
      crudfulConfig
    )
    .then((result) => result.data);

export const deleteTask = (taskId) =>
  axios.delete(
    `https://todo.crudful.com/tasks/${taskId}`,
    crudfulConfig
  );

export const postTask = (title, listId, details, due) =>
  axios
    .post(
      "https://todo.crudful.com/tasks",
      { title: title, listId: listId, details: details, due: due },
      crudfulConfig
    )
    .then((result) => result.data);

export const patchTask = (title, taskId, details, due) =>
  axios
    .patch(
      `https://todo.crudful.com/tasks/${taskId}`,
      { title: title, details: details, due: due },
      crudfulConfig
    )
    .then((result) => result.data);

export const getLists = () =>
  axios
    .get("https://todo.crudful.com/lists", crudfulConfig)
    .then((result) => result.data.results);

export const deleteList = (listId) =>
  axios.delete(
    `https://todo.crudful.com/lists/${listId}`,
    crudfulConfig
  );

export const postList = (title, color) =>
  axios
    .post(
      "https://todo.crudful.com/lists",
      { title: title, color: color },
      crudfulConfig
    )
    .then((result) => result.data);
