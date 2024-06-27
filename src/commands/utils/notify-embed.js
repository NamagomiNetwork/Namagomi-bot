const { MessageEmbed } = require("discord.js");
const color = require("../../utils/color-code");

const msg_blocked = (input, profileData) => {
    const msg = new MessageEmbed({
        title: "通知: 指定のユーザはすでにブロックされています",
        color: color.NOTIFY,
        timestamp: new Date(),
        fields: [
            {
                name: "ユーザーID: ",
                value: "`" + input + "`",
                inline: true,
            },
            {
                name: "ユーザー名: ",
                value: "`" + profileData.name + "`",
                inline: true,
            },
            {
                name: "Note: ",
                value: "ブロックを解除する場合は `unblock` コマンドを \n ハードブロックする場合は `hardblock` コマンドを実行してください",
            },
        ],
    });
    return msg;
};
const msg_hardblocked = (input, profileData) => {
    const msg = new MessageEmbed({
        title: "通知: 指定のユーザはすでにハードブロックされています",
        color: color.NOTIFY,
        timestamp: new Date(),
        fields: [
            {
                name: "ユーザーID: ",
                value: "`" + input + "`",
                inline: true,
            },
            {
                name: "ユーザー名: ",
                value: "`" + profileData.name + "`",
                inline: true,
            },
            {
                name: "Note: ",
                value: "ブロックを解除する場合は `unblock` コマンドを \n ハードブロックする場合は `hardblock` コマンドを実行してください",
            },
        ],
    });
    return msg;
};

// #region exports const MessageEmbed
exports.msg_blocked = msg_blocked;
exports.msg_hardblocked = msg_hardblocked;
// #endregion
