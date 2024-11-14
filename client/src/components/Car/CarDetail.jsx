import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCar } from "../../services/api";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  useEffect(() => {
    const fetchCarDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await getCar(id, token); // Fetch car details by ID
        setCar(data);
      } catch (error) {
        console.error("Error fetching car details:", error.message);
        alert("Failed to load car details.");
      }
    };

    fetchCarDetails();
  }, [id, navigate]);

  if (!car) return <p>Loading car details...</p>;

  return (
    <div>
      <h1>{car.title}</h1>
      <p>{car.description}</p>
      <p>Tags: {car.tags.join(", ")}</p>
      <div>
        {car.images && car.images.length > 0 ? (
          car.images.map((image, index) => (
            <img key={index} src={`${BASE_URL}${image}`} alt={`Car Image ${index + 1}`} style={{ maxWidth: "40%", marginBottom: "10px" }} />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
      <button onClick={() => navigate("/cars")}>Back to Car List</button>
    </div>
  );
};

export default CarDetail;
