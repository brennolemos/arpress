import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";

const Article = (props) => {
  const slug = props.match.params.slug;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/${slug}`)
      .then((res) => res.json())
      .then((response) => setArticle(response));
  });

  return (
    <div className="card my-3">
      <div className="card-header">
        <h2>{article && article.title}</h2>
      </div>
      <div className="card-body">
        {article && ReactHtmlParser(article.body)}
      </div>
    </div>
  );
};

export default Article;
