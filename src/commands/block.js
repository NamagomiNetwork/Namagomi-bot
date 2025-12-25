const logger = require("../modules/logger");
const config = require("../utils/get-config");
const check_admin = require("../utils/check-admin");
const profileModel = require("../utils/Schema/ProfileSchema");
const BlockUserModel = require("../utils/Schema/BlockUserSchema");
const notify_embed = require("./utils/notify-embed");
const color = require("../utils/color-code");
const { EmbedBuilder } = require("discord.js");
const sendErrorMessage = require("../modules/error-message");

exports.run = async (client, message) => {
    try {
        // 権限の確認
        const permission_check = check_admin(message, client);

        if (permission_check == "owner: no") {
            return;
        }

        const args = message.content.split(" ").slice(1);
        const input = args.join(" ");

        // ユーザーIDが指定されていない場合
        const err_argument = new EmbedBuilder({
            title: "ユーザーブロック",
            description: "コマンド実行エラー: 引数が指定されていません",
            color: color.ERROR,
            fields: [
                {
                    name: "コマンド実行に必要な引数",
                    value: "`block 【ブロックするユーザーID】`",
                },
                {
                    name: "実行例: ",
                    value: "`block 927919368665456710`",
                },
            ],
        });

        if (!input) {
            message.channel.send({ embeds: [err_argument] });
            return;
        }

        const profileData = await profileModel.findOne({ _id: input });

        if (!profileData) {
            message.channel.send("エラー: ユーザープロファイルが見つかりませんでした");
            logger.error(
                "ユーザーID: " +
                    input +
                    " のプロファイルを確認しようとしましたがプロファイルデータがありませんでした..."
            );
            return;
        }

        // block profileの確認
        const BlockData = await BlockUserModel.findOne({ _id: input });
        if (!BlockData) {
            message.channel.send("エラー: ユーザーブロックプロファイルが見つかりませんでした");
            logger.error(
                "ユーザーID: " +
                    input +
                    " のブロックプロファイルを確認しようとしましたがプロファイルデータがありませんでした..."
            );
            return;
        }

        if (config.bot.owner.includes(input)) {
            message.channel.send("さすがにbotのownerをブロックすることはできません");
            return;
        }

        if (BlockData.hardblock.includes("true")) {
            message.channel.send({ embeds: [notify_embed.msg_hardblocked(input, profileData)] });
            return;
        }
        if (BlockData.enable.includes("true")) {
            message.channel.send({ embeds: [notify_embed.msg_blocked(input, profileData)] });
            return;
        }
        await BlockData.updateOne({
            enable: true,
        });

        const data = new EmbedBuilder({
            title: "ユーザーブロック",
            description: "ユーザーをブロックしました",
            color: color.BLOCKED_NOTIFY,
            timestamp: new Date(),
            thumbnail: {
                url: profileData.avatar,
            },
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
        message.channel.send({ embeds: [data] });
    } catch (err) {
        sendErrorMessage(err, message);
    }
};

exports.name = "block";
