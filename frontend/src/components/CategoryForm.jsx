import React, { useState } from "react";

const CategoryForm = () => {
  const initialForm = {
    title: "",
  };
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  }

  function handleForm(event) {
    event.preventDefault();
    fetch("http://localhost:8080/categories/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((response) => {
        setMessage(response.message);
        setForm(initialForm);
      });
  }

  return (
    <div className="row my-3">
      <div className="col-md-12">
        {message && (
          <div className="alert alert-success">
            <h4 className="alert-heading">{message}</h4>
          </div>
        )}

        <div className="card">
          <div className="card-header">
            <h2>Cadastro de Categoria</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleForm}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Defina o título da categoria"
                  className="form-control"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-success">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
