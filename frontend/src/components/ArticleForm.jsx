import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const ArticleForm = () => {
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
                {/* <textarea
                name="body"
                id="body"
                cols="30"
                rows="5"
                className="form-control"
                placeholder="Escreva o artigo"
              ></textarea> */}
                <Editor
                className="form-control"
                  textareaName="body"
                  initialValue="<p>Escreva o artigo</p>"
                  init={{
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
              <button className="btn btn-success">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;
