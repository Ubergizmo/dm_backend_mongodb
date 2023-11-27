const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    familly_name: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    date_of_death: { type: Date, required: false },
});

module.exports = mongoose.model('authorSch', authorSchema);