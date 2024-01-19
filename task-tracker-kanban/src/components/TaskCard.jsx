import { useRef } from "react";
import { useState } from "react";

export default function TaskCard({
  id,
  taskname,
  dueDate,
  priority,
  description,
  onAddTask,
}) {
  const [showPopup, setShowPopup] = useState(false);

  const tasknameRef = useRef(null);
  const dateRef = useRef(null);
  const priorityRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleAddTask = () => {
    const task = {
      id: Date.now(),
      taskname: tasknameRef.current.value,
      dueDate: dateRef.current.value,
      priority: priorityRef.current.value,
      description: descriptionRef.current.value,
    };

    onAddTask(task);
  };

  return (
    <div className="task-card-container">
      {onAddTask && (
        <div className="task-card add-task">
          <input
            className="taskname-input"
            type="text"
            placeholder="Task Name"
            ref={tasknameRef}
          />
          <div>
            <input className="date-input" type="date" ref={dateRef} />
            <input
              className="priority-input"
              type="number"
              min="0"
              max="3"
              ref={priorityRef}
            />
          </div>
          <textarea
            className="description-input"
            placeholder="Description"
            ref={descriptionRef}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      )}
      {!onAddTask && (
        <>
          <div className="task-card">
            <h3>{taskname}</h3>
            <p>{dueDate}</p>
            <p>{priority}</p>
            <p>{description}</p>
          </div>
          {showPopup && <div className="task-card-popup"></div>}
        </>
      )}
    </div>
  );
}
