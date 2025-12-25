const logger = require("../modules/logger");
const check_admin = require("../utils/check-admin");
const TawasiModel = require("../utils/Schema/TawasiSchema");
const { EmbedBuilder } = require("discord.js");
const color = require("../utils/color-code");
const sendErrorMessage = require("../modules/error-message");

exports.run = async (client, message) => {
    try {
        const permission_check = check_admin(message, client);

        if (permission_check == "owner: no") {
            return;
        }

        const args = message.content.split(" ").slice(1);
        const input = args.join(" ");

        const tawasiData = await TawasiModel.findOne({ _id: input });
        if (!tawasiData) {
            message.channel.send({ embeds: [err_embed.main] });
            logger.error(
                "ユーザーID: " +
                    input +
                    " の1日1たわしさんをリセットしようとしましたがプロファイルデータがありませんでした..."
            );
            return;
        }

        // 文字列がない場合
        const err_argument = new EmbedBuilder({
            title: "1日1たわしさんのリセット",
            description: "コマンド実行エラー: 引数が指定されていません",
            color: color.ERROR,
            fields: [
                {
                    name: "コマンド実行に必要な引数",
                    value: "`reset-tawasi 【ユーザーID】`",
                },
            ],
        });

        if (!input) {
            message.channel.send({ embeds: [err_argument] });
            return;
        }

        // データを設定
        await tawasiData.updateOne({
            tawasi: false,
        });

        const success = new EmbedBuilder({
            title: "1日1たわしさんのリセット",
            description: "1日1たわしさんをリセット",
            color: 3853014, //★設定更新系の色を新しく定義したい。
            fields: [
                {
                    name: "リセットしたユーザーID: ",
                    value: "`" + input + "`",
                },
            ],
        });
        message.channel.send({ embeds: [success] });
    } catch (err) {
        sendErrorMessage(err, message);
    }
};

exports.name = "reset-tawasi";
