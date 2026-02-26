import { useState } from "react";

function Projects() {
  const [showDetails, setShowDetails] = useState(false);

  const projects = [
    {
      name: "Meme Generator",
      description: "A fun app that generates random memes using an API."
    },
    {
      name: "Todo App",
      description: "A simple task manager with add and delete features."
    },
    {
      name: "Weather App",
      description: "Displays live weather data using API integration."
    }
  ];

  return (
    <section id="projects" style={{ padding: "60px", textAlign: "center" }}>
      <h2>My Projects</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {projects.map((project, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              width: "250px",
              borderRadius: "8px"
            }}
          >
            <h3>{project.name}</h3>

            {showDetails && <p>{project.description}</p>}

            <button onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? "Show Less" : "Show More"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;