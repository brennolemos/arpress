import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Page = (props) => {
  const [articles, setArticles] = useState([]);
  const num = props.match.params.num;

  useEffect(() => {
    fetch(`http://localhost:8080/articles/page/${num}`)
      .then((res) => res.json())
      .then((response) => {
        setArticles(response.result.articles.rows);
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
    </>
  );
};

export default Page;
