import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080")
      .then((res) => res.json())
      .then((response) => {
        setArticles(response.articles);
      });
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
              <Link to={`/${article.slug}`} className="btn btn-success">
                Ler Mais
              </Link>
            </div>
          </div>
        ))}

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          
          <li className="page-item">
            <Link className="page-link" to="/articles/page/2">Next</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Home;
