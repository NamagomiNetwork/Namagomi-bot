const mongoose = require("mongoose");

const TawasiSchema = new mongoose.Schema({
	_id: { type: String }, //ユーザーID
	tawasi: { type: String }, //1日1たわし
	one_day_tawasi_feature: { type: String }, //たわしを表示するかどうか (true or false)
});

const model = mongoose.model("Tawasis", TawasiSchema);

module.exports = model;
