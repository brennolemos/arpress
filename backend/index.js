const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extends: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
   res.send("Bem vindo!");
});

app.listen(8080, ()=>{
   console.log("Servidor rodando!");
})