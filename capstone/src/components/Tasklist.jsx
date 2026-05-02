import React from "react";

const Tasklist = ({ tasks, completeTask, deleteTask }) => {
  if (tasks.length === 0) {
    return <p className="empty">No tasks available</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div key={index} className={`task-card ${task.done ? "done" : ""}`}>
          <div>
            <h3>{task.text}</h3>

            <p>
              Priority: <b>{task.priority}</b> | Category: <b>{task.category}</b>
            </p>

            <p>Due Date: {task.dueDate || "No date selected"}</p>
          </div>

          <div className="task-buttons">
            <button onClick={() => completeTask(index)}>Done</button>
            <button className="delete" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasklist;