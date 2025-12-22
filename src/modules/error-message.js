const logger = require("./logger");
const err_embed = require("../utils/error-embed");
const config = require("../utils/get-config");

module.exports = function sendErrorMessage(err, message) {
    logger.error("コマンド実行エラーが発生しました");
    logger.error(err);
    message.channel.send({ embeds: [err_embed.main] });
    if (config.debug.enable.includes("true")) {
        message.channel.send({ embeds: [err_embed.debug] });
        message.channel.send("エラー内容: ");
        message.channel.send("```\n" + err + "\n```");
    };
};