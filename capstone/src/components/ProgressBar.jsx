import React from "react";

const ProgressBar = ({ xp }) => {
  const progress = xp % 100;

  return (
    <div className="progress-section">
      <p>Progress to next level</p>

      <div className="bar">
        <div className="fill" style={{ width: `${progress}%` }}></div>
      </div>

      <small>{progress}/100 XP</small>
    </div>
  );
};

export default ProgressBar;