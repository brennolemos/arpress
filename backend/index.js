const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection
   .authenticate()
   .then(() => {
      console.log("Conectado ao banco!");
   }).catch((error) => {
      console.log(error);
   })

app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req, res) => {
   res.send("Bem vindo!");
});

app.listen(8080, () => {
   console.log("Servidor rodando!");
})