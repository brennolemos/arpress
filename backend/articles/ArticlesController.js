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
});

router.get("/admin/articles/edit/:id", (req, res) => {
   const id = req.params.id;
   Article.findByPk(id).then(article => {
      if (article != undefined) {
         Category.findAll().then(categories => {
            res.send({ article, categories });
         })
      } else {
         res.send("Artigo não encontrado!");
      }
   }).catch(err => {
      res.send(err);
   })
});

router.post("/articles/update", (req, res) => {
   const id = req.body.id;
   const title = req.body.title;
   const body = req.body.body;
   const categoryId = req.body.categoryId;

   Article.update({ title, body, categoryId, slug: slugify(title) }, {
      where: {
         id
      }
   }).then(() => {
      res.send({ message: "Artigo atualizado com sucesso" });
   })
});

router.get("/articles/page/:num", (req, res) => {
   const page = req.params.num;
   let offset = isNaN(page) || page == 1 ? 0 : parseInt(page - 1) * 4;

   Article.findAndCountAll({
      limit: 4,
      offset: offset
   }).then(articles => {
      let next = offset + 4 >= articles.count ? false : true;
      let result = {
         next,
         articles
      }
      Category.findAll().then(categories => {
         res.send({ result, categories });
      })
      // res.json(result);
   });
});

module.exports = router;