import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    // Call API to fetch car details by ID
    setCar({ id, title: 'Car 1', description: 'Description 1' });
  }, [id]);

  if (!car) return <div>Loading...</div>;

  return (
    <div>
      <h2>{car.title}</h2>
      <p>{car.description}</p>
      <Link to={`/cars/update/${car.id}`}>Edit Car</Link>
    </div>
  );
};

export default CarDetail;
