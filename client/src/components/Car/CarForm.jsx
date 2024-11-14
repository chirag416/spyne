import React, { useState } from "react";
import { createCar } from "../../services/api";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const CarForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate(); // Initialize navigate hook
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);

    // Append each selected image file to FormData
    for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]); // Ensure 'images' matches the field name in multer
    }

    try {
        const token = localStorage.getItem("token");
        await createCar(formData, token); // Ensure this function can handle FormData
        navigate("/cars");
    } catch (error) {
        console.error("Error creating car:", error);
    }
};


  return (
    <form onSubmit={handleSubmit} action="/uploads" method="post" encType="multipart/form-data">
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Car Title" 
        required 
      />
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Car Description" 
        required 
      />
      <input 
        type="text" 
        value={tags} 
        onChange={(e) => setTags(e.target.value)} 
        placeholder="Tags (car_type, company, etc.)" 
      />
      <input 
        type="file" 
        name="images"
        multiple 
        onChange={(e) => setImages([...e.target.files])} 
      />
      <button type="submit">Create Car</button>
    </form>
  );
};

export default CarForm;
