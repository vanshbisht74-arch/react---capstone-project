import React, { useState } from "react";

const Taskinput = ({ addTask }) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("Study");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;

    const newTask = {
      text,
      priority,
      category,
      dueDate,
      done: false,
    };

    addTask(newTask);

    setText("");
    setPriority("Low");
    setCategory("Study");
    setDueDate("");
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Enter your task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Study</option>
        <option>Personal</option>
        <option>Health</option>
        <option>Work</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

export default Taskinput;