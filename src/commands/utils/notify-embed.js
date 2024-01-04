const { MessageEmbed } = require("discord.js");

const msg_blocked = (input, profileData) => {
    new MessageEmbed({
        title: "通知: 指定のユーザはすでにブロックされています",
        color: 4886754,
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
};
const msg_hardblocked = (input, profileData) =>
    new MessageEmbed({
        title: "通知: 指定のユーザはすでにハードブロックされています",
        color: 4886754,
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

// #region exports const MessageEmbed
exports.msg_blocked = msg_blocked;
exports.msg_hardblocked = msg_hardblocked;
// #endregion
