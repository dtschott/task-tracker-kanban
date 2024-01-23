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
  {
    id: uuidv4(),
    taskname: "Task 4",
    dueDate: "2022-11-12",
    priority: 1,
    description: "Complete task 4",
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

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function App() {
  const [todos, setTodos] = useState(exampleTodos);
  const [inProgress, setInProgress] = useState(exampleInProgress);
  const [completed, setCompleted] = useState(exampleCompleted);

  let columns = {
    todos: [todos, setTodos],
    inProgress: [inProgress, setInProgress],
    completed: [completed, setCompleted],
  };

  function handleAddTask(task) {
    setTodos([...todos, task]);
  }

  function handleDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    if (source.droppableId === destination.droppableId) {
      const reorderedColumn = reorder(
        sourceColumn[0],
        result.source.index,
        result.destination.index
      );
      sourceColumn[1](reorderedColumn);
    } else {
      const [removed] = sourceColumn[0].splice(source.index, 1);
      const reorderedArray = Array.from(destColumn[0]);
      reorderedArray.splice(destination.index, 0, removed);
      destColumn[1](reorderedArray);
    }
  }

  return (
    <DragDropContext
      onDragEnd={(result, column, setColumn) => handleDragEnd(result)}
    >
      <div className="app">
        <TaskList
          name="To-Do's"
          droppableId="todos"
          adder
          onAddTask={handleAddTask}
          tasks={todos}
        />
        <TaskList
          name="In Progress"
          droppableId="inProgress"
          tasks={inProgress}
        />
        <TaskList name="Completed" droppableId="completed" tasks={completed} />
      </div>
    </DragDropContext>
  );
}

export default App;
