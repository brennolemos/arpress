import React from "react";

const ArticleForm = () => (
  <div className="row my-3">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h2>Novo Artigo</h2>
        </div>
        <div className="card-body">
          <form action="http://localhost:8080/categories/save" method="post">
            <div className="form-group">
              <input
                type="text"
                name="title"
                placeholder="Defina o título do Artigo"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <textarea
                name="body"
                id="body"
                cols="30"
                rows="5"
                className="form-control"
                placeholder="Escreva o artigo"
              ></textarea>
            </div>
            <button className="btn btn-success">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default ArticleForm;
