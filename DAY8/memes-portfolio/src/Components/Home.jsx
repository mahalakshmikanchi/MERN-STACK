import { useState } from "react";

function Home() {
  const [showIntro, setShowIntro] = useState(false);

  return (
    <section id="home" style={{ padding: "60px", textAlign: "center" }}>
      <h1 style={{ color: "#00adb5", fontSize: "40px" }}>MahaLakshmi</h1> {/* Inline Styling */}
      <h3>React Developer</h3>

      <button onClick={() => setShowIntro(!showIntro)}>
        {showIntro ? "Hide Introduction" : "Show Introduction"}
      </button>

      {/* Conditional Rendering */}
      {showIntro && (
        <p>
          I am a passionate React developer who loves building creative,
          responsive and interactive web applications.
        </p>
      )}
    </section>
  );
}

export default Home;