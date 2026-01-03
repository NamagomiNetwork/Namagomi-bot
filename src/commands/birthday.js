const logger = require("../modules/logger");
const config = require("../utils/get-config");
const ProfileModel = require("../utils/Schema/ProfileSchema");
const color = require("../utils/color-code");
const { EmbedBuilder } = require("discord.js");
const sendErrorMessage = require("../modules/error-message");

exports.run = async (client, message) => {
    try {
        const args = message.content.split(" ").slice(1);

        // ユーザーIDが指定されていない場合
        const err_argument = new EmbedBuilder({
            title: "誕生日設定",
            description: "コマンド実行エラー: 誕生日が正しく指定されていません",
            color: color.ERROR,
            fields: [
                {
                    name: "コマンド実行に必要な引数",
                    value: "`birthday 【自分の誕生日】`",
                },
                {
                    name: "実行例: ",
                    value: "`birthday 07/30`",
                },
            ],
        });

        if (args.length !== 1) {
            message.channel.send({ embeds: [err_argument] });
            return;
        }

        const birthday = args[0].split("/").map(Number);

        if (birthday.length !== 2) {
            message.channel.send({ embeds: [err_argument] });
            return;
        }

        const month = birthday[0];
        const day = birthday[1];

        // profileの確認
        const ProfileData = await ProfileModel.findOne({ _id: message.author.id });
        if (!ProfileData) {
            message.channel.send("エラー: ユーザープロファイルが見つかりませんでした");
            logger.error(
                "ユーザーID: " +
                    message.author.id +
                    " のプロファイルを確認しようとしましたがプロファイルデータがありませんでした..."
            );
            return;
        }

        await ProfileData.updateOne({
            birthday_month: month,
            birthday_day: day,
        });

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
    } catch (err) {
        sendErrorMessage(err, message);
    }
};

exports.name = "birthday";
