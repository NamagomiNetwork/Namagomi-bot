const color = require("../../utils/color-code");
import { EmbedBuilder, Client, Message, TextChannel } from "discord.js";
import { birthday_admin } from "./birthday_admin";
const sendErrorMessage = require("../../modules/error-message");
const logger = require("../../modules/logger");
const { birthday_set } = require("./birthday_set");
const { birthday_enable, birthday_disable } = require("./birthday_flag");
const check_admin = require("../../utils/check-admin");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @returns 
 */
exports.run = async (client, message) => {
    try {
        const args = message.content.split(" ").slice(1);
        const subcommand = (args[0] || "").toLowerCase();

        const err_argument = new EmbedBuilder({
            title: "誕生日設定",
            description: "コマンド実行エラー: 誕生日コマンドの形式が正しくありません",
            color: color.ERROR,
            fields: [
                {
                    name: "コマンド実行に必要な引数",
                    value:
                        "`birthday set 【自分の誕生日】`\n" +
                        "`birthday enable`\n" +
                        "`birthday disable`\n" +
                        "`birthday admin 【ユーザーのID】 【サブコマンド...】`",
                },
                {
                    name: "実行例: ",
                    value: "`birthday set 07/30`",
                },
            ],
        });

        if (!(message.channel instanceof TextChannel)) {
            logger.warn(`This command not available on this channel. type ${message.channel.type} id: ${message.channel.id}`);
            return;
        }

        const userId = message.author.id;
        const permission_check = check_admin(message, client);

        switch (subcommand) {
            case "set":
                await birthday_set(userId, message, args.slice(1));
                return;
            case "enable":
                await birthday_enable(userId, message, args.slice(1));
                return;
            case "disable":
                await birthday_disable(userId, message, args.slice(1));
                return;
            case "admin":
                if (permission_check == "owner: no") {
                    return;
                }
                await birthday_admin(message, args.slice(1));
                return;
            default:
                message.channel.send({ embeds: [err_argument] });
                return;
        }
    } catch (err) {
        sendErrorMessage(err, message);
    }
};

exports.name = "birthday";
