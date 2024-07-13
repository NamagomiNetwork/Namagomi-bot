const { EmbedBuilder } = require("discord.js");
const config = require("../utils/get-config");
const color = require("../utils/color-code");

module.exports = (client) => {
    const today = new Date();
    const dayOfweek = today.getDay();
    let embed;

    if (dayOfweek == 0 || dayOfweek == 6) {
        embed = new EmbedBuilder({
            title: "香川チャレンジの時間です",
            color: color.CMD_RUN,
            description: "Minecraft-v1.16.5を起動しましょう",
            fields: [
                {
                    name: "本日の香川開始時間",
                    value: "19:30",
                },
            ],
        });
    } else {
        embed = new EmbedBuilder({
            title: "香川チャレンジの時間です",
            color: color.CMD_RUN,
            description: "Minecraft-v1.16.5を起動しましょう",
            fields: [
                {
                    name: "本日の香川開始時間",
                    value: "20:00",
                },
            ],
        });
    }

    const mention = "<@&" + config.kagawa_notification.role + ">";
    client.channels.cache.get(config.kagawa_notification.channel).send(mention);
    client.channels.cache.get(config.kagawa_notification.channel).send({ embeds: [embed] });
};
