import React, { useState, useEffect } from "react";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/admin/categories")
      .then((res) => res.json())
      .then((response) => setCategories(response));
  }, []);
  return (
    <div className="row my-3">
      <div className="col-md-12">
        <h2 className="mb-3">Categorias</h2>
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
            {categories &&
              categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.title}</td>
                  <td>{category.slug}</td>
                  <td></td>
                </tr>
              ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesList;
