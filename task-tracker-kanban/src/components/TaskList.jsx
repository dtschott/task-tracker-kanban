import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Droppable, Draggable } from "react-beautiful-dnd";

function TaskList({ tasks, name, droppableId, adder, onAddTask }) {
  const [addingTask, setAddingTask] = useState(false);

  return (
    <div className="task-list-container">
      <h1>{name}</h1>
      {adder && <TaskCard onAddTask={onAddTask} />}
      <Droppable droppableId={droppableId} style={{ width: "100%" }}>
        {(provided) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    className="task-card-container"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard
                      id={task.id}
                      taskname={task.taskname}
                      dueDate={task.dueDate}
                      priority={task.priority}
                      description={task.description}
                      dragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TaskList;
