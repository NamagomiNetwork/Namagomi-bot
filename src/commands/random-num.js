const logger = require("../modules/logger");
const { EmbedBuilder } = require("discord.js");
const color = require("../utils/color-code");
const sendErrorMessage = require("../modules/error-message");

exports.run = (client, message, args) => {
    try {
        const [count, ...choices] = args;
        if (!count) return message.channel.send({ content: "試行回数を指定してください" });
        if (!Number.isInteger(Number(count)))
            return message.channel.send({
                content: "試行回数は整数で指定してください",
            });
        if (count < 1)
            return message.channel.send({
                content: "試行回数は1以上の整数で指定してください",
            });
        if (choices.length < 2 || count > choices.length)
            return message.channel.send({
                content: "選択肢は最低2つ以上かつ試行回数以上で指定してください",
            });
        let arr = choices.join();
        let num = choices.length;

        const results = [];

        for (let i = 0; i < count; i++) {
            const random = Math.floor(Math.random() * choices.length);
            results[i] = choices[random];
            choices.splice(random, 1);
        }

        const result = results.join(",");

        const success = new EmbedBuilder({
            title: "抽選結果",
            description: result,
            color: color.CMD_RUN,
            fields: [
                {
                    name: "試行回数:",
                    value: `${count}/${num}`,
                },
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

exports.name = "random-num";
