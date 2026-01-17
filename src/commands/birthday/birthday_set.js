const { EmbedBuilder, Message, TextChannel } = require("discord.js");
const logger = require("../../modules/logger");
const { isValid, parse, format } = require("date-fns");
const color = require("../../utils/color-code");
const ProfileModel = require("../../utils/Schema/ProfileSchema");

const err_argument = new EmbedBuilder({
    title: "誕生日設定",
    description: "コマンド実行エラー: 誕生日が正しく指定されていません",
    color: color.ERROR,
    fields: [
        {
            name: "コマンド実行に必要な引数",
            value: "`birthday set 【自分の誕生日】`",
        },
        {
            name: "実行例: ",
            value: "`birthday set 07/30`",
        },
    ],
});

/**
 * @param {string} userId
 * @param {Message} message
 * @param {string[]} args
 * 誕生日を設定する
 */
const birthday_set = async (userId, message, args) => {
    if (!(message.channel instanceof TextChannel)) {
        logger.warn(`This command not available on this channel. type ${message.channel.type} id: ${message.channel.id}`);
        return;
    }

    if (args.length !== 1) {
        message.channel.send({ embeds: [err_argument] });
        return;
    }

    const parsedBirthday = parse_date_to_month_day(args[0]);
    if (!parsedBirthday) {
        message.channel.send({ embeds: [err_argument] });
        return;
    }
    const { month, day } = parsedBirthday;

    const ProfileData = await _birthday_set(userId, month, day);
    if (!ProfileData) {
        return;
    }

    const data = new EmbedBuilder({
        title: "誕生日設定",
        description: "誕生日を設定しました",
        color: color.BIRTHDAY_NOTIFY,
        timestamp: new Date(),
        thumbnail: {
            url: ProfileData.avatar,
        },
        fields: [
            {
                name: "ユーザーID: ",
                value: "`" + message.author.id + "`",
                inline: true,
            },
            {
                name: "ユーザー名: ",
                value: "`" + ProfileData.name + "`",
                inline: true,
            },
            {
                name: "誕生日: ",
                value: "`" + month + "/" + day + "`",
                inline: true,
            },
        ],
    });
    message.channel.send({ embeds: [data] });
};

/**
 * @param {string} userId
 * @param {number} month
 * @param {number} day
 * 誕生日を設定する内部ロジック
 */
const _birthday_set = async (userId, month, day) => {
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
        birthday_month: month,
        birthday_day: day,
    });

    return ProfileData;
};

/**
 * 
 * @param {string} input ⭕️ "01/23", ❌️ "99/99"
 * @returns {{month: number, day: number}} null if not valid
 */
function parse_date_to_month_day(input) {
    if (typeof input !== "string") {
        return null;
    }

    const match = input.trim().match(/^(\d{1,2})\/(\d{1,2})$/);
    if (!match) {
        return null;
    }

    const month = Number(match[1]);
    const day = Number(match[2]);
    const normalized = `${month}/${day}`;
    const parsed = parse(normalized, "M/d", new Date(2000, 0, 1));

    if (!isValid(parsed) || format(parsed, "M/d") !== normalized) {
        return null;
    }

    return { month, day };
}

module.exports = { birthday_set, _birthday_set };
