const mongoose = require("mongoose");

/**
 * 後からアーカイブするために誕生日チャンネルを保存するテーブル。
 * 詳細は {@link ../../sub-systems/birthday-notification.js} を参照。
 */
const BirthdayChannelSchema = new mongoose.Schema({
    channelId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
});

const model = mongoose.model("BirthdayChannels", BirthdayChannelSchema);

module.exports = model;
