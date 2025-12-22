const { EmbedBuilder } = require("discord.js");
const pkg = require("../../package.json");
const logger = require("../modules/logger");
const child = require("child_process");
const color = require("../utils/color-code");
const repo_url = "https://github.com/NamagomiNetwork/Namagomi-bot/commit/";
const sendErrorMessage = require("../modules/error-message");

exports.run = (client, message) => {
    try {
        // commit情報を取得
        child.exec("git log -n 1 --pretty=format:%H,%h,%s", (err, res) => {
            let result = [];
            let commit_hash = "取得エラー";
            let commit_short_hash = "取得エラー";
            let commit_message = "取得エラーが発生しました...";

            if (err) {
                logger.error(err);
            } else if (res) {
                result = res.toString().split(",");
                commit_hash = result[0] || "unknown";
                commit_short_hash = result[1] || "unknown";
                commit_message = result[2] || "取得エラーが発生しました...";
            }

            const embed = new EmbedBuilder({
                title: "Version",
                color: color.CMD_RUN,
                footer: {
                    text: "Current Version",
                },
                fields: [
                    {
                        name: "commit short hash",
                        value: "[" + commit_short_hash + "]" + "(" + repo_url + commit_hash + ")",
                    },
                    {
                        name: "commit message",
                        value: commit_message,
                    },
                    {
                        name: "bot-version",
                        value: pkg.version || "unknown",
                        inline: true,
                    },
                    {
                        name: "Discord.js Version",
                        value: require("discord.js").version,
                        inline: true,
                    },
                ],
            });
            
            message.channel.send({ embeds: [embed] }).catch((e) => logger.error(e));
        });
    } catch (err) {
        sendErrorMessage(err, message);
    }
};

exports.name = "version";
