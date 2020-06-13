import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditArticle = (props) => {
  const id = props.match.params.id;

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [article, setArticle] = useState({
    title: "",
    body: "",
    categoryId: null,
  });

  useEffect(() => {
    fetch(`http://localhost:8080/admin/articles/edit/${id}`)
      .then((res) => res.json())
      .then((response) => {
        setCategories(response.categories);
        setArticle(response.article);
      });
  }, []);

  const handleEditor = (content, editor) => {
    setArticle({
      body: content,
    });
  };

  function handleChange(event) {
    setArticle({
      ...article,
      [event.target.id]: event.target.value,
    });
  }

  //   function handleForm(event) {
  //     event.preventDefault();
  //     fetch("http://localhost:8080/categories/save", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(form),
  //     })
  //       .then((res) => res.json())
  //       .then((response) => {
  //         setMessage(response.message);
  //       });
  //   }

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
            <h2>Editar Artigo</h2>
          </div>
          <div className="card-body">
            <form action="http://localhost:8080/articles/save" method="post">
              <div className="form-group">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={article && article.title}
                  onChange={handleChange}
                  placeholder="Defina o título do Artigo"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <Editor
                  className="form-control"
                  textareaName="body"
                  initialValue={article && article.body}
                  init={{
                    language: "pt_BR",
                    language_url: "/langs/pt_BR.js",
                    height: 300,
                    // menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                  }}
                  onEditorChange={handleEditor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="categoryId">Categoria</label>
                <select
                  name="categoryId"
                  id="categoryId"
                  className="form-control"
                  onChange={handleChange}
                  value={article.categoryId}
                >
                  {categories &&
                    categories.map((category) => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      );
                    })}
                </select>
              </div>
              <button className="btn btn-success">Atualizar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
