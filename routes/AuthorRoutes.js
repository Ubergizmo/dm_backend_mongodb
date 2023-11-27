const express = require('express');
const router = express.Router();
//on import router pour créé les diférente route de notre projet
const authorSch = require('../model/authorShema');
//on import le schema mongoose des autheur

//tous les autheurs
router.get('/', async (req, res) => {
    try {
        const response = await authorSch.find();
        res.send({ totalAutheurs: response.length });
    } catch (err) {
        res.status(500).json({ message_err: err.message })
    }

});
//un seul autheur
router.get('/:id', oneAuthor, (req, res) => {
    res.json(res.response);

});
//update un autheur
router.patch('/:id', oneAuthor, async (req, res) => {
    if (req.body.first_name != null) res.response.first_name = req.body.first_name;
    if (req.body.familly_name != null) res.response.familly_name = req.body.familly_name;
    if (req.body.date_of_birth != null) res.response.date_of_birth = req.body.date_of_birth;
    if (req.body.date_of_death != null) res.response.date_of_death = req.body.date_of_death;
    try {
        const updateResponse = await res.response.save();
        res.json({ updateResponse })
    } catch (err) {
        res.status(400).json({ message_err: err.message })
    }
});
//supprimer un autheur
router.delete('/:id', oneAuthor, async (req, res) => {
    try {
        await res.response.deleteOne();
        res.json({ message: 'Autheur supprimé' });
    } catch (err) {
        res.status(500).json({ message_err: err.message });
    }
});
//ajouter un autheur
router.post('/', async (req, res) => {
    const obj = new authorSch({
        first_name: req.body.first_name,
        familly_name: req.body.familly_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
    })
    try {
        const newAuthor = await obj.save();
        res.status(201).json(newAuthor)
    } catch (err) {
        res.status(400).json({ message_err: err.message });
    }
});
async function oneAuthor(req, res, next) {
    let response;
    try {
        response = await authorSch.findById(req.params.id);
        if (response == null) {
            return res.status(404).json({ message: "Aucun autheur trouvé" });
        }
    } catch (err) {
        return res.status(500).json({ message_err: err.message });
    }
    res.response = response;
    next();
};

module.exports = router
