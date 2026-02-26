import React, { useEffect, useState } from "react";
import { getMemes, deleteMeme } from "../api/memeService";
import MemeCard from "./MemeCard";

const MemeList = () => {
  const [memes, setMemes] = useState([]);

  const fetchMemes = async () => {
    const data = await getMemes();
    setMemes(data);
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  const handleDelete = async (id) => {
    await deleteMeme(id);
    fetchMemes();
  };

  return (
    <div className="grid">
      {memes.map((meme) => (
        <MemeCard key={meme.id} meme={meme} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default MemeList;