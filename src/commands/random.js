const { EmbedBuilder } = require("discord.js");
const color = require("../utils/color-code");
const sendErrorMessage = require("../modules/error-message");

exports.run = (client, message, args) => {
    try {
        const [...choices] = args;
        let arr = choices.join();

        const random = Math.floor(Math.random() * choices.length);
        const result = choices[random];

        const success = new EmbedBuilder({
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
        sendErrorMessage(err, message);
    }
};

exports.name = "random";
