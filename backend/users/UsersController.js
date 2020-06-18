const express = require("express");
const router = express.Router();
const User = require("./User");

router.get("/admin/users", (req, res) => {
   res.send("Lista Usuários");
});

router.get("/admin/users/create", (req, res) => {
   res.send({ message: "Criar Usuário" });
});

module.exports = router;