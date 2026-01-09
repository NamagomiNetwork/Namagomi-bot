import { Client, Message, EmbedBuilder, TextChannel } from "discord.js";
import logger from "../../modules/logger";
const color = require("../../utils/color-code");
const ProfileModel = require("../../utils/Schema/ProfileSchema");

const err_argument_builder = (/** @type {string} */ command) => {
    return new EmbedBuilder({
        title: "誕生日設定",
        description: "コマンド実行エラー: 不正なコマンド",
        color: color.ERROR,
        fields: [
            {
                name: "コマンド実行に必要な引数",
                value: `\`${command}\``,
            },
        ],
    });
}

const err_argument_enable = err_argument_builder("birthday enable");
const err_argument_disable = err_argument_builder("birthday disable");

/**
 * @param {string} userId
 * @param {Message} message
 * @param {string[]} args
 * 誕生日を有効化する
 */
export async function birthday_enable(userId, message, args) {
    await birthday_flag_set(userId, message, args, true);
}

/**
 * @param {string} userId
 * @param {Message} message
 * @param {string[]} args
 * 誕生日を無効化する
 */
export async function birthday_disable(userId, message, args) {
    await birthday_flag_set(userId, message, args, false);
}

/**
 * @param {string} userId
 * @param {Message} message
 * @param {string[]} args
 * @param {boolean} flag
 * 誕生日を有効化/無効化する
 */
async function birthday_flag_set(userId, message, args, flag) {
    if (!(message.channel instanceof TextChannel)) {
        logger.warn(`This command not available on this channel. type ${message.channel.type} id: ${message.channel.id}`);
        return;
    }

    const embed = flag ? err_argument_enable : err_argument_disable;

    if (args.length > 0) {
        message.channel.send({ embeds: [embed] });
        return;
    }

    const ProfileData = await _birthday_flag_set(userId, flag);
    if (!ProfileData) {
        return;
    }

    const data = new EmbedBuilder({
        title: "誕生日設定",
        description: "誕生日のフラグを変更しました",
        color: color.BIRTHDAY_NOTIFY,
        timestamp: new Date(),
        thumbnail: {
            url: ProfileData.avatar,
        },
        fields: [
            {
                name: "ユーザーID: ",
                value: "`" + userId+ "`",
                inline: true,
            },
            {
                name: "ユーザー名: ",
                value: "`" + ProfileData.name + "`",
                inline: true,
            },
            {
                name: "誕生日が有効か: ",
                value: `\`${flag}\``,
                inline: true,
            },
        ],
    });
    message.channel.send({ embeds: [data] });
}

/**
 * @param {string} userId
 * @param {boolean} flag
 * 誕生日を有効化/無効化する内部ロジック
 */
export async function _birthday_flag_set(userId, flag) {
    const ProfileData = await ProfileModel.findOne({ _id: userId });
    if (!ProfileData) {
        logger.error(
            "ユーザーID: " +
                userId +
                " のプロファイルを確認しようとしましたがプロファイルデータがありませんでした..."
        );
        return null;
    }

    await ProfileData.updateOne({
        birthday_flag: flag
    });

    return ProfileData;
}
