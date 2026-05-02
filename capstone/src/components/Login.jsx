import React, { useState } from "react";

const Login = ({ loginUser }) => {
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    }

    loginUser(name);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>⚡ Neon Task Quest</h1>
        <p>Login to start your productivity mission</p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleLogin}>Start Mission</button>
      </div>
    </div>
  );
};

export default Login;