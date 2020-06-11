const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
   Article.findAll({
      include: [{ model: Category }]
   }).then(articles => {
      res.send(articles);
   })
});

router.get("/admin/articles/new", (req, res) => {
   Category.findAll().then(categories => {
      res.send(categories);
   })
});

router.post("/articles/delete", (req, res) => {
   const id = req.body.id;
   if (id != undefined) {
      if (!isNaN(id)) {
         Article.destroy({
            where: {
               id
            }
         }).then(() => {
            res.send({ message: "Artigo deletada com sucesso!" });
         })
      } else {
         res.send({ message: "Digite um valor válido!" });
      }
   } else {
      res.send({ message: "Digite um valor válido!" });
   }
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