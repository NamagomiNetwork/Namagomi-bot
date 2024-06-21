const { MessageEmbed } = require("discord.js");
const package = require("../../package.json");
const logger = require("../modules/logger");
const err_embed = require("../utils/error-embed");
const child = require("child_process");
const config = require("../utils/get-config");
const repo_url = "https://github.com/NamagomiNetwork/Namagomi-bot/commit/";

exports.run = (client, message) => {
    try {
        // リモートリポジトリから
        
        child.exec("git pull origin main", (err, res) => {
            let result;
            let commit_hash;
            let commit_short_hash;
            let commit_message;

            if (err) {
                for (let i = 0; i < 3; i++) {
                    result[i] = "取得エラーが発生しました...";
                }
            } else {
                result = res.toString().split(",");
                commit_hash = result[0];
                commit_short_hash = result[1];
                commit_message = result[2];
            }

            const embed = new MessageEmbed({
                title: "Deploy now...",
                color: 5301186,
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
        });
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

exports.name = "version";
