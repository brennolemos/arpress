import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserArticlesList = (props) => {
  const slug = props.match.params.slug;

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/category/${slug}`)
      .then((res) => res.json())
      .then((response) => setArticles(response));
  });
  return (
    <>
      {articles.length ? (
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
        ))
      ) : (
        <h3 className="text-center my-4">Não há artigos nessa categoria!</h3>
      )}
    </>
  );
};

export default UserArticlesList;
