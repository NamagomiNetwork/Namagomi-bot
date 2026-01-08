const mongoose = require("mongoose");

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
