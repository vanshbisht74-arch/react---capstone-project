import React from "react";

const ProgressBar = ({ xp }) => {
  const progress = xp % 100;

  return (
    <div className="progress-area">
      <p>Progress to next level</p>

      <div className="xp-bar">
        <div style={{ width: `${progress}%` }}></div>
      </div>

      <small>{progress}/100 XP</small>
    </div>
  );
};

export default ProgressBar;