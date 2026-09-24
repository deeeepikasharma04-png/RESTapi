// model/model.js
// A "model" is just a blueprint that describes what a piece of data
// should look like before it's allowed to be saved in the database.

const mongoose = require('mongoose');

// Here we say: every record must have a "name" (text) and an "age" (number),
// and both of these fields are required (cannot be left empty).
const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
});

// We turn this blueprint into a real Mongoose "Model" called "Data",
// and export it so other files (like routes.js) can use it.
module.exports = mongoose.model('Data', dataSchema);