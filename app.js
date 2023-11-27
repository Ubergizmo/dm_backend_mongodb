const express = require("express");
const app = express();
//j'importe express
const port = 2045;
const BookRoutes = require('./routes/BookRoutes');
const AuthorRoutes = require('./routes/AuthorRoutes');
//j'importe mes routes pour les livres et les autheurs 
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/projet_db";

mongoose.set("strictQuery", false);
mongoose.connect(mongoDB);
const db = mongoose.connection;

app.use(express.json())
app.use("/books", BookRoutes);
app.use("/authors", AuthorRoutes);
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});