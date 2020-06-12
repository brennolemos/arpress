const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
})

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
   Article.findAll().then(articles => {
      res.send(articles)
   })
});

app.get("/:slug", (req, res) => {
   const slug = req.params.slug;
   Article.findOne({
      where: {
         slug
      }
   }).then(article => {
      res.send(article)
   })
})

app.listen(8080, () => {
   console.log("Servidor rodando!");
})