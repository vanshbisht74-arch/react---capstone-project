import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Taskinput from "./components/Taskinput";
import Tasklist from "./components/Tasklist";
import Stats from "./components/Stats";
import ProgressBar from "./components/ProgressBar";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [xp, setXp] = useState(JSON.parse(localStorage.getItem("xp")) || 0);
  const [darkMode, setDarkMode] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("xp", JSON.stringify(xp));
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("username", username);
  }, [tasks, xp, isLoggedIn, username]);

  const loginUser = (name) => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
  };

  const calculateXP = (priority) => {
    if (priority === "High") return 40;
    if (priority === "Medium") return 25;
    return 10;
  };

  const addTask = (task) => {
    setTasks([{ ...task, id: Date.now(), done: false }, ...tasks]);
  };

  const completeTask = (id) => {
    const updated = tasks.map((task) => {
      if (task.id === id && !task.done) {
        setXp((prev) => prev + calculateXP(task.priority));
        return { ...task, done: true };
      }
      return task;
    });

    setTasks(updated);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const resetAll = () => {
    setTasks([]);
    setXp(0);
  };

  const completedTasks = tasks.filter((task) => task.done).length;
  const level = Math.floor(xp / 100);
  const streak = completedTasks;

  let filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.done;
    if (filter === "pending") return !task.done;
    return true;
  });

  filteredTasks = filteredTasks.filter((task) =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "priority") {
    const order = { High: 1, Medium: 2, Low: 3 };
    filteredTasks.sort((a, b) => order[a.priority] - order[b.priority]);
  }

  if (sort === "oldest") {
    filteredTasks.sort((a, b) => a.id - b.id);
  }

  if (!isLoggedIn) {
    return <Login loginUser={loginUser} />;
  }

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        username={username}
        logoutUser={logoutUser}
      />

      <div className="container">
        <Stats
          xp={xp}
          level={level}
          totalTasks={tasks.length}
          completedTasks={completedTasks}
          streak={streak}
        />

        <ProgressBar xp={xp} />

        <Taskinput addTask={addTask} />

        <div className="controls">
          <input
            type="text"
            placeholder="Search task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="priority">Priority</option>
          </select>

          <button className="reset" onClick={resetAll}>
            Reset
          </button>
        </div>

        <Tasklist
          tasks={filteredTasks}
          completeTask={completeTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default App;