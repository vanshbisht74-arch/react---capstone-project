import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Taskinput from "./components/Taskinput";
import Tasklist from "./components/Tasklist";
import Stats from "./components/Stats";
import ProgressBar from "./components/ProgressBar";
import RewardShop from "./components/RewardShop";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [xp, setXp] = useState(JSON.parse(localStorage.getItem("xp")) || 0);
  const [coins, setCoins] = useState(JSON.parse(localStorage.getItem("coins")) || 0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("xp", JSON.stringify(xp));
    localStorage.setItem("coins", JSON.stringify(coins));
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("username", username);
  }, [tasks, xp, coins, isLoggedIn, username]);

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
    const updatedTasks = tasks.map((task) => {
      if (task.id === id && !task.done) {
        const earnedXP = calculateXP(task.priority);
        setXp((prev) => prev + earnedXP);
        setCoins((prev) => prev + Math.floor(earnedXP / 5));
        return { ...task, done: true };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, updatedData) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedData } : task
      )
    );
  };

  const buyReward = (price) => {
    if (coins < price) {
      alert("Not enough coins!");
      return;
    }

    setCoins(coins - price);
    alert("Reward purchased!");
  };

  const resetAll = () => {
    setTasks([]);
    setXp(0);
    setCoins(0);
  };

  const level = Math.floor(xp / 100) + 1;
  const completedTasks = tasks.filter((task) => task.done).length;

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  const habits = filteredTasks.filter((task) => task.category === "Habit");
  const dailies = filteredTasks.filter((task) => task.category === "Daily");
  const todos = filteredTasks.filter((task) => task.category === "To Do");

  if (!isLoggedIn) {
    return <Login loginUser={loginUser} />;
  }

  return (
    <div className="app">
      <Navbar username={username} logoutUser={logoutUser} coins={coins} />

      <section className="hero">
        <div className="avatar-box">
          <div className="avatar">🧙‍♂️</div>
          <h2>{username}</h2>
          <p>Level {level} Productivity Warrior</p>
        </div>

        <div className="hero-stats">
          <Stats
            xp={xp}
            level={level}
            completedTasks={completedTasks}
            totalTasks={tasks.length}
            coins={coins}
          />
          <ProgressBar xp={xp} />
        </div>
      </section>

      <main className="dashboard">
        <div className="top-tools">
          <input
            type="text"
            placeholder="Search your quests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={resetAll}>Reset</button>
        </div>

        <Taskinput addTask={addTask} />

        <div className="columns">
          <Tasklist
            title="Habits"
            tasks={habits}
            completeTask={completeTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />

          <Tasklist
            title="Dailies"
            tasks={dailies}
            completeTask={completeTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />

          <Tasklist
            title="To Do's"
            tasks={todos}
            completeTask={completeTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />

          <RewardShop coins={coins} buyReward={buyReward} />
        </div>
      </main>
    </div>
  );
};

export default App;