const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");

router.get("/articles", (req, res)=> {
   res.send("Rota de Artigos");
});

router.get("/admin/articles/new", (req, res)=> {
   Category.findAll().then(categories => {
      res.send(categories);
   })
});

module.exports = router;