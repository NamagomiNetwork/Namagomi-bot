const mongoose = require('mongoose');

const omikujiSchema = new mongoose.Schema({
    _id: { type: String }, //ユーザーID
    one_day_omikuji_feature: { type: String }, // 1日1おみくじが有効かどうか
    one_day_omikuji: { type: String }, //1日1おみくじが実行されたかどうか
    mae_no_omikuji_kekka: { type: String }, //前のおみくじ結果
});

const model = mongoose.model('omikujis', omikujiSchema);

module.exports = model;