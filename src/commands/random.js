const logger = require("../modules/logger");
const err_embed = require("../utils/error-embed");
const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
  try {
    const [count, ...choices] = args;
    if (!count)
      return message.channel.send({ content: "試行回数を指定してください" });
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

    const success = new MessageEmbed({
      title: "抽選結果",
      description: result,
      color: 5301186,
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
