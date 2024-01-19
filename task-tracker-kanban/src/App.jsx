import TaskList from "./components/TaskList";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const exampleTodos = [
  {
    id: uuidv4(),
    taskname: "Task 1",
    dueDate: "2022-10-31",
    priority: 3,
    description: "Complete task 1",
  },
];

const exampleInProgress = [
  {
    id: uuidv4(),
    taskname: "Task 2",
    dueDate: "2022-10-31",
    priority: 3,
    description: "Complete task 2",
  },
];

const exampleCompleted = [
  {
    id: uuidv4(),
    taskname: "Task 3",
    dueDate: "2022-10-31",
    priority: 3,
    description: "Complete task 3",
  },
];

function App() {
  const [todos, setTodos] = useState(exampleTodos);
  const [inProgress, setInProgress] = useState(exampleInProgress);
  const [completed, setCompleted] = useState(exampleCompleted);

  function handleAddTask(task) {
    setTodos([...todos, task]);
  }

  return (
    <DragDropContext>
      <div className="app">
        <TaskList
          name="To-Do's"
          adder
          onAddTask={handleAddTask}
          tasks={todos}
        />
        <TaskList name="In Progress" tasks={inProgress} />
        <TaskList name="Completed" tasks={completed} />
      </div>
    </DragDropContext>
  );
}

export default App;
