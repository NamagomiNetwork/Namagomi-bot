const { EmbedBuilder } = require("discord.js");
const pkg = require("../../package.json");
const config = require("../utils/get-config");
const prefix = config.bot.prefix;
const color = require("../utils/color-code");
const sendErrorMessage = require("../modules/error-message");

exports.run = (client, message) => {
    try {
        const embed = new EmbedBuilder({
            title: "about",
            description: "botの詳細を表示します",
            color: color.DETAIL,
            fields: [
                {
                    name: "Repository",
                    value: "https://github.com/NamagomiNetwork/Namagomi-bot",
                },
                {
                    name: "License",
                    value: "`" + prefix + "license` で確認をお願いします",
                },
                {
                    name: "Botバージョン",
                    value: pkg.version,
                },
            ],
        });
        message.channel.send({ embeds: [embed] });
    } catch (err) {
        sendErrorMessage(err, message);
    }
};

exports.name = "about";
