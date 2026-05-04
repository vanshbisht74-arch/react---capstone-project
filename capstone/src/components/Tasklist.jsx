import React, { useState } from "react";

const Tasklist = ({ title, tasks, completeTask, deleteTask, editTask }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState("Low");
  const [editDueDate, setEditDueDate] = useState("");

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate || "");
  };

  const saveEdit = (id) => {
    if (editText.trim() === "") return;

    editTask(id, {
      text: editText,
      priority: editPriority,
      dueDate: editDueDate,
    });

    setEditingId(null);
  };

  const isOverdue = (task) => {
    const today = new Date().toISOString().split("T")[0];
    return task.dueDate && task.dueDate < today && !task.done;
  };

  return (
    <div className="task-column">
      <h2>
        {title} <span>{tasks.length}</span>
      </h2>

      {tasks.length === 0 ? (
        <div className="empty-box">No quests here</div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`task-card ${task.done ? "done" : ""} ${
              isOverdue(task) ? "overdue" : ""
            }`}
          >
            {editingId === task.id ? (
              <div className="edit-box">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>

                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                />

                <button onClick={() => saveEdit(task.id)}>Save</button>
              </div>
            ) : (
              <>
                <div>
                  <h3>{task.text}</h3>
                  <p>
                    Priority: <b>{task.priority}</b>
                  </p>
                  <p>Due: {task.dueDate || "No due date"}</p>
                  {isOverdue(task) && <p className="overdue-text">Overdue!</p>}
                </div>

                <div className="task-actions">
                  <button
                    onClick={() => completeTask(task.id)}
                    disabled={task.done}
                  >
                    {task.done ? "Done" : "Complete"}
                  </button>

                  <button onClick={() => startEdit(task)}>Edit</button>

                  <button className="delete" onClick={() => deleteTask(task.id)}>
                    ✕
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Tasklist;