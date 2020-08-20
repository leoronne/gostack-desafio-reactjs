import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  async function loadRepos() {
    try {
      const response = await api.get("/repositories");
      const { data } = response;
      setRepositories(data);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    loadRepos();
  }, []);

  async function handleAddRepository() {
    try {
      const body = {
        title: "Desafio Node.js",
        url: "http://github.com/leoronne/proffy",
        techs: ["Node.js"],
      };
      const response = await api.post("/repositories", body);
      const { data } = response;

      setRepositories([...repositories, data]);
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories(repositories.filter((repo) => repo.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => {
          return (
            <li key={repo.id}>
              <p>{repo.title}</p>
              <p>{repo.url}</p>
              <p>{repo.likes}</p>
              <p>{JSON.stringify(repo.techs)}</p>
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
