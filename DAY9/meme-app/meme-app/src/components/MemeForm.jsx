import React, { useState } from "react";
import { createMeme } from "../api/memeService";

const MemeForm = ({ refresh }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    category: "",
    likes: 0
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMeme({
      ...formData,
      likes: Number(formData.likes),
      createdAt: new Date().toISOString().split("T")[0]
    });

    setFormData({
      title: "",
      image: "",
      category: "",
      likes: 0
    });

    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="image" placeholder="Image URL" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="likes" type="number" placeholder="Likes" onChange={handleChange} />
      <button type="submit">Add Meme</button>
    </form>
  );
};

export default MemeForm;