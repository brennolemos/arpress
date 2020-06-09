import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ArticlesList = () => {
  const [articles, setarticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/admin/articles")
      .then((res) => res.json())
      .then((response) => {
        setarticles(response);
        console.log("renderizou");
      });
  }, []);
  return (
    <div className="row my-3">
      <div className="col-md-12">
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
          <h2>Artigos</h2>
          <Link to="/admin/articles/new" className="btn btn-success">
            Novo Artigo
          </Link>
        </div>
        <table className="table table-bordered table-stripped table-hovered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Slug</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {articles
              ? articles.map((article) => (
                  <tr key={article.id}>
                    <td>{article.id}</td>
                    <td>{article.title}</td>
                    <td>{article.slug}</td>
                    <td>{article.categoryId}</td>
                    <td className="d-flex justify-content-center">
                      <Link
                        to={`/admin/articles/edit/${article.id}`}
                        className="btn btn-warning btn-sm mr-2"
                      >
                        Editar
                      </Link>
                      <form
                        action="http://localhost:8080/articles/delete"
                        method="post"
                        // onSubmit={confirmDelete}
                      >
                        <input type="hidden" name="id" value={article.id} />
                        <button className="btn btn-danger btn-sm">
                          Deletar
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              : "Carregando..."}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticlesList;
