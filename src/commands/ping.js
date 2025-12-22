const { EmbedBuilder } = require("discord.js");
const color = require("../utils/color-code");
const sendErrorMessage = require("../modules/error-message");

exports.run = (client, message) => {
    try {
        const embed = new EmbedBuilder({
            title: "🏓pong!",
            description: "ping値を表示します",
            color: color.DETAIL,
            timestamp: new Date(),
            fields: [
                {
                    name: "WebSocket",
                    value: client.ws.ping + "ms",
                },
            ],
        });
        message.channel.send({ embeds: [embed] });
    } catch (err) {
        sendErrorMessage(err, message);
    }
};

exports.name = "ping";
