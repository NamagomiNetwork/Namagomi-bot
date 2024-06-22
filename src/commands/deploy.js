const { MessageEmbed } = require("discord.js");
const check_admin = require("../utils/check-admin");
const logger = require("../modules/logger");
const err_embed = require("../utils/error-embed");
const child = require("child_process");
const config = require("../utils/get-config");

exports.run = (client, message) => {
    try {
        const permission_check = check_admin(message, client);

        if (permission_check == "owner: no") {
            return;
        }
        // リモートリポジトリから
        child.exec("git pull origin main", (err, res) => {
            let details;
            let isAlready = "";
            const checkDetailsforAlready = (str) => {
                if (str.includes("Already")) {
                    isAlready = "???「もう最新に反映されとるで」";
                }
            };
            if (err) {
                details[0] = "取得エラーが発生しました...";
            } else {
                details = res.toString();
            }

            checkDetailsforAlready(details);

            const deploy_embed = new MessageEmbed({
                title: "Deploy now...",
                color: 5301186,
                timestamp: new Date(),
                fields: [
                    {
                        name: "Deploy Info",
                        value: "```sh\n" + details + "```",
                        inline: true,
                    },
                ],
                footer: {
                    text: isAlready,
                },
            });
            message.channel.send({ embeds: [deploy_embed] });
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

exports.name = "deploy";
