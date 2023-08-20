const { MessageEmbed } = require("discord.js");
const package = require("../../package.json");
const os = require("os");
const logger = require("../modules/logger");
const err_embed = require("../utils/error-embed");
exports.run = (client, message, args) => {
  try {
    // 空きメモリを計算
    const freemem_byte = os.freemem;
    const freemem_kb = freemem_byte / 1024;
    const freemem_mb = freemem_kb / 1024;
    const freemem_gb = freemem_mb / 1024;
    const freemem = Math.floor(freemem_gb * 1000) / 1000;

    var embed = new MessageEmbed({
      title: "SystemStatus",
      color: 5301186,
      footer: {
        text: "System Status",
      },
      fields: [
        {
          name: "OS Information",
          value: os.type() + "," + os.version() + " " + os.arch(),
        },
        {
          name: "OS Free Memory",
          value: freemem + " GB",
        },
        {
          name: "bot-version",
          value: package.version,
          inline: true,
        },
        {
          name: "Discord.js Version",
          value: require("discord.js").version,
          inline: true,
        },
      ],
    });
    message.channel.send({ embeds: [embed] });
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

exports.name = "status";
