import React from "react";

const Stats = ({ xp, level, totalTasks, completedTasks }) => {
  let badge = "Beginner 🟢";

  if (xp >= 100) badge = "Focused Learner 🔵";
  if (xp >= 300) badge = "Productivity Pro 🟣";
  if (xp >= 500) badge = "Task Master 🏆";

  return (
    <div className="stats">
      <div className="stat-card">
        <h3>XP</h3>
        <p>{xp}</p>
      </div>

      <div className="stat-card">
        <h3>Level</h3>
        <p>{level}</p>
      </div>

      <div className="stat-card">
        <h3>Tasks</h3>
        <p>
          {completedTasks}/{totalTasks}
        </p>
      </div>

      <div className="stat-card">
        <h3>Badge</h3>
        <p>{badge}</p>
      </div>
    </div>
  );
};

export default Stats;