export const getTasks = () => {
  return axios
    .get("https://todo.crudful.com/tasks", {
      headers: {
        cfAccessKey: "75ca4ddbde8291858f35dfc4b8b75f7b45e40700",
      },
    })
    .then((result) => result.data.results);
};
