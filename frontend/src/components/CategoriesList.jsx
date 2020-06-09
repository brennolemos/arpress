import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/admin/categories")
      .then((res) => res.json())
      .then((response) => {
        setCategories(response);
        console.log("renderizou");
      });
  }, []);

  function confirmDelete(event) {
    event.preventDefault();
    if (window.confirm("Deseja realmente deletar esta categoria?")) {
      event.target.submit();
    }
  }

  return (
    <div className="row my-3">
      <div className="col-md-12">
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
          <h2>Categorias</h2>
          <Link to="/admin/categories/new" className="btn btn-success">
            Nova Categoria
          </Link>
        </div>
        <table className="table table-bordered table-stripped table-hovered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Slug</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories
              ? categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.title}</td>
                    <td>{category.slug}</td>
                    <td className="d-flex justify-content-center">
                      <Link to={`/admin/categories/edit/${category.id}`} className="btn btn-warning btn-sm mr-2">
                        Editar
                      </Link>
                      <form
                        action="http://localhost:8080/categories/delete"
                        method="post"
                        onSubmit={confirmDelete}
                      >
                        <input type="hidden" name="id" value={category.id} />
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

export default CategoriesList;
