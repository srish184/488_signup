import React, { useState } from "react";
import axios from "axios";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      console.log(response);
      if (response.data.status === 200) {
        window.location.href = "/thank";
      } else {
        alert(response.data.msg);
      }

      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">UserName:</label>
          <input
            type="text"
            id="username"
            value={username}
            minLength={4}
            maxLength={20}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            minLength={4}
            maxLength={20}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
