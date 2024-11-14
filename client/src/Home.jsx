import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       // If the user is logged in, redirect to the profile page
//       navigate("/profile");
//     }
//   }, [navigate]);

  return (
    <div style={styles.container}>
      <h1>Welcome to the Car App</h1>
      <p>Login or Register to continue</p>
      <div style={styles.buttons}>
        <button style={styles.button} onClick={() => navigate("/login")}>
          Login
        </button>
        <button style={styles.button} onClick={() => navigate("/signup")}>
          Register
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '5px',
  }
};

export default HomePage;
