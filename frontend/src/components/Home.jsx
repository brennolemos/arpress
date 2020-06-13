import React from "react";
import { Link } from "react-router-dom";

const Home = ({ articles }) => {
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
    </>
  );
};

export default Home;
