const express = require("express");
const app = express();
//j'importe express
const port = 2045;
const BookRoutes = require('./routes/BookRoutes');
const AuthorRoutes = require('./routes/AuthorRoutes');
//je fixe le moteur de vue à ejs
app.set('view engine', 'ejs');
app.use(express.static("public"));
//j'importe mes routes pour les livres et les autheurs 
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/projet_db";
mongoose.connect(mongoDB) //je connecte mon serveur mongooDB
    .then(() => {
        console.log("Connection à MongoDB réussie")
    }).catch((err) => {
        console.error(`Erreur de connection: `, err);
    });
app.use(express.json())
//route pour les livres
app.use("/books", BookRoutes);
//route pour les auteurs
app.use("/authors", AuthorRoutes);
//route pour la page d'accueil en ejs
app.get("/", (req, res) => {
    res.render("index")
})
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});