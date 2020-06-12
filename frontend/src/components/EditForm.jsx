import React, { useState, useEffect } from "react";

const EditForm = (props) => {
  const id = props.match.params.id;
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/admin/categories/edit/${id}`)
      .then((data) => data.json())
      .then((res) => setResponse(res));
  });

  function handleChange(event) {
    setResponse({
      title: event.target.value,
    });
  }

  return (
    <div className="row my-3">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h2>Edição de Categoria</h2>
          </div>
          <div className="card-body">
            <form
              action="http://localhost:8080/categories/update"
              method="post"
            >
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  value={response && response.title}
                  onChange={handleChange}
                  placeholder="Defina o título da categoria"
                  className="form-control"
                />
                <input type="hidden" name="id" value={id} />
              </div>
              <button className="btn btn-success">Atualizar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
