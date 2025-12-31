const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    _id: { type: String }, //ユーザーID
    name: { type: String }, //ユーザーネーム
    avatar: { type: String }, //アバター
    prefix: { type: String }, //ユーザーprefix
    birthday_month: { type: Number }, //誕生月
    birthday_day: { type: Number }, //誕生日
});

const model = mongoose.model("Profiles", profileSchema);

module.exports = model;
