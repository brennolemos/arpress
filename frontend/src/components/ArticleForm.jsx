import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const ArticleForm = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/admin/articles/new")
      .then((res) => res.json())
      .then((response) => setCategories(response));
  });
  const handleEditor = (content, editor) => {
    console.log(content);
  };

  return (
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
                <Editor
                  className="form-control"
                  textareaName="body"
                  initialValue="<p>Escreva o artigo</p>"
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
                      "undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help",
                  }}
                  onEditorChange={handleEditor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <select
                  name="category"
                  id="category"
                  className="form-control"
                >
                  {categories && categories.map(category => (
                    <option key={category.id} value={category.id}>{category.title}</option>
                  ))}
                </select>
              </div>
              <button className="btn btn-success">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;
