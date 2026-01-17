const { Client, EmbedBuilder, Message, TextChannel } = require("discord.js");
const { birthday_disable, birthday_enable } = require("./birthday_enabled");
const { birthday_set } = require("./birthday_set");
const logger = require("../../modules/logger");
const color = require("../../utils/color-code");
const init_profile = require("../../utils/init-profile");

const err_argument = new EmbedBuilder({
    title: "誕生日設定",
    description: "コマンド実行エラー: 誕生日コマンドの形式が正しくありません",
    color: color.ERROR,
    fields: [
        {
            name: "コマンド実行に必要な引数",
            value:
                "`birthday admin 【ユーザーのID】 【サブコマンド...】`",
        },
        {
            name: "実行例: ",
            value: "`birthday admin 0123456789 set 07/30`",
        },
    ],
});

/**
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 * 他人の誕生日関連のコマンドを実行する。管理者権限のチェックは呼び出し元が行う。
 */
const birthday_admin = async (client, message, args) => {
    if (!(message.channel instanceof TextChannel)) {
        logger.warn(`This command not available on this channel. type ${message.channel.type} id: ${message.channel.id}`);
        return;
    }

    if (args.length < 2) {
        message.channel.send({ embeds: [err_argument] });
        return;
    }

    const userId = args[0];
    const subcommand = args[1];
    
    await init_profile(client, userId);

    switch (subcommand) {
        case "set":
            await birthday_set(userId, message, args.slice(2))
            return;
        case "enable":
            await birthday_enable(userId, message, args.slice(2));
            return;
        case "disable":
            await birthday_disable(userId, message, args.slice(2));
            return;
        default:
            message.channel.send({ embeds: [err_argument] });
            return;
    }
};

module.exports = { birthday_admin };
