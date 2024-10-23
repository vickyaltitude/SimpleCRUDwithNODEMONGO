const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: String,
    age: Number,
    position: String,
    salary: Number
})

const bookModel = mongoose.model('employees',bookSchema);

module.exports = bookModel;