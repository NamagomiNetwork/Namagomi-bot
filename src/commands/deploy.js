const { EmbedBuilder } = require("discord.js");
const check_admin = require("../utils/check-admin");
const child = require("child_process");
const color = require("../utils/color-code");
const sendErrorMessage = require("../modules/error-message");

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

            const deploy_embed = new EmbedBuilder({
                title: "Deploy now...",
                color: color.CMD_RUN,
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
        sendErrorMessage(err, message);
    }
};

exports.name = "deploy";
