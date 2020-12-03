import { useState } from "react";
import "./App.css";
import TasksPage from "./Tasks/TasksPage";

// Correction : d36f66bc-d060-48a2-b19e-6bbf225eb1a1
// Mobile Development : 1cc88321-3761-4eb6-9d22-b7eecc341b37

const App = () => {
  const [listId, setListId] = useState("");
  return (
    <div className="App">
      <div className="App-root">
        <button onClick={() => setListId("")}>Tout</button>
        <button
          onClick={() =>
            setListId("d36f66bc-d060-48a2-b19e-6bbf225eb1a1")
          }
        >
          Liste "Correction"
        </button>
        <button
          onClick={() =>
            setListId("1cc88321-3761-4eb6-9d22-b7eecc341b37")
          }
        >
          Liste "Mobile Development"
        </button>
        <TasksPage listId={listId} />
      </div>
    </div>
  );
};

export default App;
