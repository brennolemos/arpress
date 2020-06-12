import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080")
      .then((res) => res.json())
      .then((response) => setArticles(response));
  }, []);

  return (
    <>
      {articles &&
        articles.map((article) => (
          <div className="card my-3" key={article.id}>
            <div className="card-header">
              <h2>{article.title}</h2>
            </div>
            <div className="card-body">
               <Link to="/" className="btn btn-success">Ler Mais</Link>
            </div>
          </div>
        ))}
    </>
  );
};

export default Home;