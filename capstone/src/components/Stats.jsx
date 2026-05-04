import React from "react";

const Stats = ({ xp, level, completedTasks, totalTasks, coins }) => {
  return (
    <div className="stats">
      <div>
        <h3>XP</h3>
        <p>{xp}</p>
      </div>

      <div>
        <h3>Level</h3>
        <p>{level}</p>
      </div>

      <div>
        <h3>Tasks</h3>
        <p>
          {completedTasks}/{totalTasks}
        </p>
      </div>

      <div>
        <h3>Coins</h3>
        <p>{coins}</p>
      </div>
    </div>
  );
};

export default Stats;