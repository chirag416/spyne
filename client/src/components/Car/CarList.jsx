import React, { useEffect, useState } from "react";
import { getCars } from "../../services/api";
import { useNavigate } from "react-router-dom";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await getCars(token);
        setCars(data);
      } catch (error) {
        if (error.response?.status === 401) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          alert("Failed to fetch cars: " + (error.response?.data.message || error.message));
        }
      }
    };

    fetchCars();
  }, [navigate]);

  const filteredCars = cars.filter(
    (car) =>
      car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <h1>Car List</h1>
      <input
        type="text"
        placeholder="Search cars..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "300px" }}
      />
      <button onClick={() => navigate("/create")}>Create Car</button>

      {filteredCars.length > 0 ? (
        filteredCars.map((car) => (
          <div
            key={car._id}
            style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", cursor: "pointer" }}
            onClick={() => navigate(`/cars/${car._id}`)} // Navigate to car details
          >
            <h3>{car.title}</h3>
            <p>{car.description.length > 50 ? `${car.description.slice(0, 50)}...` : car.description}</p>
            <p>Tags: {car.tags.join(", ")}</p>
          </div>
        ))
      ) : (
        <p>No cars available.</p>
      )}
    </div>
  );
};

export default CarList;
