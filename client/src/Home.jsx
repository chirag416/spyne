import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>Welcome to the Car Management Application</h1>
      <p>Login or Register to continue</p>
      <div>
        <button onClick={() => navigate("/login")}>
          Login
        </button>
        <button onClick={() => navigate("/signup")}>
          Register
        </button>
      </div>
    </div>
  );
};


export default HomePage;
