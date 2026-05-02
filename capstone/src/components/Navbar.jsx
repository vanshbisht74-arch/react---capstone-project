import React from "react";

const Navbar = ({ darkMode, setDarkMode, username, logoutUser }) => {
  return (
    <div className="navbar">
      <h2>⚡ Neon Task Quest</h2>

      <div className="nav-actions">
        <span>Hello, {username}</span>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <button className="logout" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;