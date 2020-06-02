import React from "react";

const CategoryForm = () => (
  <div className="row my-3">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h2>Cadastro de Categoria</h2>
        </div>
        <div className="card-body">
          <form action="http://localhost:8080/categories/save" method="post">
            <div className="form-group">
              <input
                type="text"
                name="title"
                placeholder="Defina o título da categoria"
                className="form-control"
              />
            </div>
            <button className="btn btn-success">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default CategoryForm;
