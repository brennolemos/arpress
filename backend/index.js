const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");

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
app.use("/", usersController);

app.get("/", (req, res) => {
   Article.findAll({
      order: [
         ['id', 'DESC']
      ],
      limit: 4
   }).then(articles => {
      Category.findAll().then(categories => {
         res.send({ articles, categories })
      })
   })
});

app.get("/:slug", (req, res) => {
   const slug = req.params.slug;
   Article.findOne({
      where: {
         slug
      }
   }).then(article => {
      Category.findAll().then(categories => {
         res.send({ article, categories })
      })
   })
});

app.get("/category/:slug", (req, res) => {
   const slug = req.params.slug;
   Category.findOne({
      where: {
         slug
      },
      include: [{model: Article}]
   }).then(category => {
      res.send(category.articles)
   })
})

app.listen(8080, () => {
   console.log("Servidor rodando!");
})