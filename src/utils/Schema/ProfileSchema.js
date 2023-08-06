const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    _id: { type: String }, //ユーザーID
    name: { type: String }, //ユーザーネーム
    avatar: { type: String }, //アバター
    prefix: { type: String }, //ユーザーprefix
});

const model = mongoose.model('Profiles', profileSchema);

module.exports = model;