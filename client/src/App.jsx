import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import CarList from "./components/Car/CarList";
import CarForm from "./components/Car/CarForm";
import CarDetail from "./components/Car/CarDetail";
import HomePage from "./Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/create" element={<CarForm />} />
        <Route path="/cars/:id" element={<CarDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
