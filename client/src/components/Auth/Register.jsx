import React, { useState } from "react";
import { registerUser } from "../../services/api";
import { useNavigate } from "react-router-dom"; // Using useNavigate instead of useHistory

const Register = () => {
  const [username, setUsername] = useState(""); // Change 'name' to 'username'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, password }; // Send 'username' instead of 'name'
    
    try {
      const { data } = await registerUser(userData); // Register user via API
      localStorage.setItem("token", data.token); // Store token in localStorage
      navigate("/cars"); // Redirect to cars list page after successful registration
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} // Change to setUsername
        placeholder="Username" 
        required 
      />
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
