import React, { useEffect, useState } from "react";
import {
  getMemes,
  createMeme,
  deleteMeme,
  updateMeme,
} from "./api/memeService";
import Login from "./pages/Login";

function App() {
  const [memes, setMemes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isAuth") === "true"
  );
  const [form, setForm] = useState({
    title: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    if (isLoggedIn) fetchMemes();
  }, [isLoggedIn]);

  const fetchMemes = async () => {
    const data = await getMemes();
    setMemes(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMeme({
      ...form,
      likes: 0,
      createdAt: new Date().toISOString(),
    });
    setForm({ title: "", image: "", category: "" });
    fetchMemes();
  };

  const handleDelete = async (id) => {
    await deleteMeme(id);
    fetchMemes();
  };

  const handleLike = async (meme) => {
    await updateMeme(meme.id, {
      ...meme,
      likes: meme.likes + 1,
    });
    fetchMemes();
  };

  const logout = () => {
    localStorage.removeItem("isAuth");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div style={{ padding: "40px" }}>
      <div style={styles.header}>
        <h1 style={{ color: "white" }}>Meme Dashboard</h1>
        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>

      <div style={styles.formCard}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            placeholder="Title"
            style={styles.input}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Image URL"
            style={styles.input}
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <input
            placeholder="Category"
            style={styles.input}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <button style={styles.addBtn}>Add Meme</button>
        </form>
      </div>

      <div style={styles.grid}>
        {memes.map((meme) => (
          <div key={meme.id} style={styles.card}>
            <img
              src={meme.image}
              alt={meme.title}
              style={styles.image}
            />
            <h3>{meme.title}</h3>
            <p>Category: {meme.category}</p>
            <p>❤️ {meme.likes}</p>

            <div style={styles.btnGroup}>
              <button onClick={() => handleLike(meme)} style={styles.like}>
                Like 👍
              </button>
              <button
                onClick={() => handleDelete(meme.id)}
                style={styles.delete}
              >
                Delete ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logout: {
    padding: "8px 15px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
  formCard: {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  addBtn: {
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    background: "#667eea",
    color: "white",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "15px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  like: {
    background: "#4CAF50",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  delete: {
    background: "#f44336",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default App;