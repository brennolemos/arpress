const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.post("/categories/save", (req, res) => {
   const title = req.body.title;
   if (title != undefined) {
      Category.create({
         title,
         slug: slugify(title)
      }).then(() => {
         res.send({ message: "Categoria cadastrada com sucesso!" })
      })
   } else {
      res.send({ message: "Digite um valor válido!" })
   }
});

router.post("/categories/delete", (req, res) => {
   const id = req.body.id;
   if (id != undefined) {
      if (!isNaN(id)) {
         Category.destroy({
            where: {
               id
            }
         }).then(() => {
            res.send({ message: "Categoria deletada com sucesso!" });
         })
      } else {
         res.send({ message: "Digite um valor válido!" });
      }
   } else {
      res.send({ message: "Digite um valor válido!" });
   }
});

router.get("/admin/categories", (req, res) => {
   Category.findAll().then(categories => {
      res.send(categories)
   })
})

router.get("/admin/categories/edit/:id", (req, res) => {
   const id = req.params.id;
   
   if (isNaN(id)) {
      res.send({ message: "Nenhuma categoria encontrada." });
   }
   
   Category.findByPk(id).then(category => {
      if (category != undefined) {
         res.send(category);
      } else {
         res.send({ message: "Nenhuma categoria encontrada." });
      }
   }).catch(err => {
      res.send({ message: err });
   });
});

module.exports = router;