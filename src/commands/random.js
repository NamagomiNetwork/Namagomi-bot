const logger = require("../modules/logger");
const err_embed = require("../utils/error-embed");
const { MessageEmbed } = require("discord.js");
const config = require("../utils/get-config");
const color = require("../utils/color-code");

exports.run = (client, message, args) => {
    try {
        const [...choices] = args;
        let arr = choices.join();

        const random = Math.floor(Math.random() * choices.length);
        const result = choices[random];

        const success = new MessageEmbed({
            title: "抽選結果",
            description: result,
            color: color.CMD_RUN,
            fields: [
                {
                    name: "選択肢:",
                    value: arr,
                },
            ],
        });
        message.channel.send({ embeds: [success] });
    } catch (err) {
        logger.error("コマンド実行エラーが発生しました");
        logger.error(err);
        message.channel.send({ embeds: [err_embed.main] });
        if (config.debug.enable.includes("true")) {
            message.channel.send({ embeds: [err_embed.debug] });
            message.channel.send("エラー内容: ");
            message.channel.send("```\n" + err + "\n```");
        }
    }
};

exports.name = "random";
