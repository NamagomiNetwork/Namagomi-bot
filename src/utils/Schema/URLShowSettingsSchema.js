const mongoose = require('mongoose');

const URLShowSettingsSchema = new mongoose.Schema({
    _id: { type: String }, //ユーザーID
    x_twitter_show: { type: String }, //Twitterのポストを埋め込み展開するかどうか(true or false)
    discord_show: { type: String }, //Discordのポストを埋め込み展開するかどうか (true or false)（★未使用）
});

const model = mongoose.model('URLShowSettings', URLShowSettingsSchema);

module.exports = model;