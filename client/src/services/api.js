import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { "Content-Type": "application/json" }
});

console.log("Base URL:", BASE_URL); // Should print http://localhost:5000/
console.log("API Base URL:", API.defaults.baseURL); // Should print http://localhost:5000/api

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);



// Add logging to check token
export const createCar = (formData, token) => {
  console.log("createCar token:", token); // Debugging token
  if (!token) {
    console.error("No token provided for createCar");
    throw new Error("No token provided");
  }
  return API.post("/cars", formData, { headers: { "Content-Type": 'multipart/formData',  Authorization: `Bearer ${token}` } });
};

// Add logging to check token
export const getCars = (token) => {
  console.log("getCars token:", token); // Debugging token
  if (!token) {
    console.error("No token provided for getCars");
    throw new Error("No token provided");
  }
  return API.get("/cars", { headers: { Authorization: `Bearer ${token}` } });
};

export const updateCar = (id, carData, token) => {
  console.log("updateCar token:", token); // Debugging token
  return API.put(`/cars/${id}`, carData, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteCar = (id, token) => {
  console.log("deleteCar token:", token); // Debugging token
  return API.delete(`/cars/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};

// Assuming getCar is defined in api.js to fetch a single car by ID
export const getCar = (id, token) => {
  return API.get(`/cars/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};
