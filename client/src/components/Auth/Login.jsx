import React, { useState } from "react";
import { loginUser } from "../../services/api";
import { useNavigate } from "react-router-dom"; // Updated to useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await loginUser({ email, password });
    localStorage.setItem("token", data.token); // Store JWT token
    navigate("/cars"); // Redirect to the cars list page after successful login
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
