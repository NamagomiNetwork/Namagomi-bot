const mongoose = require('mongoose');

const BlockUserSchema = new mongoose.Schema({
    _id: { type: String }, //ユーザーID
    enable: { type: String }, //ブロックが有効か無効か(true or false)
    hardblock: { type: String }, //ハードブロックが有効か無効か(true or false)
    name: { type: String },
    avatar: { type: String }, //アバター
});

const model = mongoose.model('Blocks', BlockUserSchema);

module.exports = model;