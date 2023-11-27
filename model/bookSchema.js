const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true }, //type author
    summary: { type: String, required: true },
    isbn: { type: Number, required: true },
});

module.exports = mongoose.model('bookSch', bookSchema);