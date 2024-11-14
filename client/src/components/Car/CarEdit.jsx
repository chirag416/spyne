import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCar, updateCar } from "../../services/api"; // Assuming updateCar is the API call for updating

const CarEdit = () => {
  const { id } = useParams();
  const [car, setCar] = useState({ title: "", description: "", tags: [], image: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await getCar(id, token);
        setCar(data);
      } catch (error) {
        alert("Failed to fetch car details.");
      }
    };

    fetchCar();
  }, [id]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      await updateCar(id, car, token);
      navigate(`/cars/${id}`); // Navigate back to car details page after update
    } catch (error) {
      alert("Failed to update car: " + (error.response?.data.message || error.message));
    }
  };

  return (
    <div>
      <h1>Edit Car</h1>
      <input
        type="text"
        value={car.title}
        onChange={(e) => setCar({ ...car, title: e.target.value })}
        placeholder="Title"
      />
      <textarea
        value={car.description}
        onChange={(e) => setCar({ ...car, description: e.target.value })}
        placeholder="Description"
      />
      <input
        type="text"
        value={car.tags.join(", ")}
        onChange={(e) => setCar({ ...car, tags: e.target.value.split(",").map(tag => tag.trim()) })}
        placeholder="Tags (comma separated)"
      />
      <input
        type="file"
        onChange={(e) => setCar({ ...car, image: e.target.files[0] })}
      />
      <button onClick={handleUpdate}>Update Car</button>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
};

export default CarEdit;
