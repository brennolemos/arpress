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

router.get("/admin/categories", (req, res) => {
   Category.findAll().then(categories => {
      res.send(categories)
   })
})


module.exports = router;