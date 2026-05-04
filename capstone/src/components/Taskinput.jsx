import React, { useState } from "react";

const Taskinput = ({ addTask }) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("To Do");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;

    addTask({
      text,
      priority,
      category,
      dueDate,
    });

    setText("");
    setPriority("Low");
    setCategory("To Do");
    setDueDate("");
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Add a new quest..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Habit</option>
        <option>Daily</option>
        <option>To Do</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button onClick={handleAdd}>+ Add Quest</button>
    </div>
  );
};

export default Taskinput;