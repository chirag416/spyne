import React, { useEffect, useState } from "react";
import { getCars } from "../../services/api"; // Assuming this is the correct API call
import { useNavigate } from "react-router-dom"; // For navigation

const CarList = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);

      if (!token) {
        console.log("No token found, redirecting to login");
        navigate("/login");
        return;
      }

      try {
        const { data } = await getCars(token);
        console.log("Fetched cars:", data);
        
        // Log each car's images
        data.forEach(car => {
          console.log("Car images:", car.images);
        });
        
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error.response?.data || error.message);
        if (error.response?.status === 401) {
          console.error("Unauthorized request, invalid token.");
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("token"); // Clear invalid token
          navigate("/login"); // Redirect to login
        } else {
          alert("Failed to fetch cars: " + (error.response?.data.message || error.message));
        }
      }
    };

    fetchCars();
  }, [navigate]);

  return (
    <div>
      <h1>Car List</h1>
      <button onClick={() => navigate("/create")}>Create Car</button>
      {cars.length > 0 ? (
        cars.map((car) => (
          <div key={car._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h3>{car.title}</h3>
            <p>{car.description}</p>
            {/* Render images */}
            {car.images && car.images.length > 0 && (
              <div>
                {car.images.map((image, index) => (
                  <img 
                    key={index} 
                    src={`http://localhost:5000${image}`} 
                    alt={`Car ${car.title} - Image ${index + 1}`} 
                    style={{ width: '400px', height: 'auto', margin: '10px' }} 
                  />
                ))}
              </div>
            )}
            <p>Tags: {car.tags.join(", ")}</p> {/* Display tags */}
          </div>
        ))
      ) : (
        <p>No cars available.</p>
      )}
    </div>
  );
};

export default CarList;