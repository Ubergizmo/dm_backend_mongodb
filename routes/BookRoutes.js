const express = require('express');
const router = express.Router();
//on import router pour créé les diférente route de notre projet
const bookSch = require('../model/bookSchema');
//on import le schema mongoose des livres

//tous les livres
router.get('/', async (req, res) => {
    try {
        const response = await bookSch.find();
        res.send({ totalLivres: response.length, livres: response });
    } catch (err) {
        res.status(500).json({ message_err: err.message })
    }

})
//un seul livre
router.get('/:id', oneBook, (req, res) => {
    res.json(res.response);

})
//update un livre
router.put('/:id', oneBook, async (req, res) => {
    if (req.body.title != null) res.response.title = req.body.title;
    if (req.body.author != null) res.response.author = req.body.author;
    if (req.body.isbn != null) res.response.isbn = req.body.isbn;
    if (req.body.summary != null) res.response.summary = req.body.summary;
    try {
        const updateResponse = await res.response.save();
        res.json({ updateResponse })
    } catch (err) {
        res.status(400).json({ message_err: err.message })
    }
})
//supprimer un livre
router.delete('/:id', oneBook, async (req, res) => {
    try {
        await res.response.deleteOne();
        res.json({ message: 'Livre supprimé' });
    } catch (err) {
        res.status(500).json({ message_err: err.message });
    }
});
//ajouter un livre
router.post('/', async (req, res) => {
    const obj = new bookSch({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        isbn: req.body.isbn,
    })
    try {
        const newBook = await obj.save();
        res.status(201).json(newBook)
    } catch (err) {
        res.status(400).json({ message_err: err.message });
    }
})
//retrouver tous les livres d'un autheur
router.get('/authors/:authorId', async (req, res) => {
    try {
        const authorBooks = await bookSch.find({ 'author': req.params.authorId });
        res.json({ authorBooks });
    } catch (err) {
        res.status(500).json({ message_err: err.message });
    }
});
//fonction pour retourner un seul élément grâce à son id
async function oneBook(req, res, next) {
    let response;
    try {
        response = await bookSch.findById(req.params.id);
        if (response == null) {
            return res.status(404).json({ message: "Aucun livre trouvé" });
        }
    } catch (err) {
        return res.status(500).json({ message_err: err.message });
    }
    res.response = response;
    next();
}

module.exports = router;
