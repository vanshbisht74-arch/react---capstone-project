import React from "react";

const Navbar = ({ username, logoutUser, coins }) => {
  return (
    <nav className="navbar">
      <div className="logo">⚔️ QuestBoard</div>

      <div className="nav-links">
        <span>Tasks</span>
        <span>Inventory</span>
        <span>Challenges</span>
        <span>Rewards</span>
      </div>

      <div className="nav-user">
        <span>🪙 {coins}</span>
        <span>{username}</span>
        <button onClick={logoutUser}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;