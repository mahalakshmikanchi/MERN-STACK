
import axios from "axios";

const API_URL = "http://localhost:5001/memes";

export const getMemes = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createMeme = async (meme) => {
  const res = await axios.post(API_URL, meme);
  return res.data;
};

export const deleteMeme = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateMeme = async (id, meme) => {
  const res = await axios.put(`${API_URL}/${id}`, meme);
  return res.data;
};