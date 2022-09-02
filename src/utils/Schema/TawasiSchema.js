const mongoose = require('mongoose');

const tawasiSchema = new mongoose.Schema({
    _id: { type: String }, //ユーザーID
    tawasi: { type: String }, //1日1たわし
});

const model = mongoose.model('Tawasis', tawasiSchema);

module.exports = model;