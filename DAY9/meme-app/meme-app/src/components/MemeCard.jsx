import React from "react";

const MemeCard = ({ meme, onDelete }) => {
  return (
    <div className="card">
      <img src={meme.image} alt={meme.title} />
      <h3>{meme.title}</h3>
      <p>Category: {meme.category}</p>
      <p>Likes: {meme.likes}</p>
      <button onClick={() => onDelete(meme.id)}>Delete</button>
    </div>
  );
};

export default MemeCard;