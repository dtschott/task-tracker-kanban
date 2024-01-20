import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Droppable, Draggable } from "react-beautiful-dnd";

function TaskList({ tasks, name, droppableId, adder, onAddTask }) {
  const [addingTask, setAddingTask] = useState(false);

  return (
    <Droppable droppableId={droppableId} style={{ width: "100%" }}>
      {(provided) => (
        <div
          className="task-list-container"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h1>{name}</h1>
          <div className="task-list">
            {adder && <TaskCard onAddTask={onAddTask} />}
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
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
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default TaskList;
