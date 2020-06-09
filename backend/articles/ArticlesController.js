const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/articles", (req, res) => {
   res.send("Rota de Artigos");
});

router.get("/admin/articles/new", (req, res) => {
   Category.findAll().then(categories => {
      res.send(categories);
   })
});

router.post("/articles/save", (req, res) => {
   const title = req.body.title;
   const body = req.body.body;
   const category = req.body.category;

   Article.create({
      title,
      slug: slugify(title),
      body,
      categoryId: category
   }).then(() => {
      res.send({ message: "Artigo cadastrado com sucesso!" });
   })
})

module.exports = router;