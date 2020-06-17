import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Page = (props) => {
  const [articles, setArticles] = useState([]);
  const [next, setNext] = useState(null);
  const [page, setPage] = useState(null);
  const num = props.match.params.num;

  useEffect(() => {
    fetch(`http://localhost:8080/articles/page/${num}`)
      .then((res) => res.json())
      .then((response) => {
        setArticles(response.result.articles.rows);
        setNext(response.result.next);
        setPage(response.result.page);
      });
  }, [num]);

  let prev;
  if (page > 2) {
    prev = (
      <li className="page-item">
        <Link className="page-link" to={`/articles/page/${page - 1}`}>
          Prev
        </Link>
      </li>
    );
  } else if (page == 2) {
    prev = (
      <li className="page-item">
        <Link className="page-link" to="/">
          Prev
        </Link>
      </li>
    );
  } else {
    prev = null;
  }

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
          {prev}

          {next && (
            <li className="page-item">
              <Link className="page-link" to={`/articles/page/${page + 1}`}>
                Next
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Page;
