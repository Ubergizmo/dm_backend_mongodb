const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    familly_name: { type: String, required: true },
    date_of_birth: { type: String, required: true },
    date_of_death: { type: String, required: false },
});

module.exports = mongoose.model('autheur_db', authorSchema);