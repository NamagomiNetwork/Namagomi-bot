const logger = require("../modules/logger");
const config = require("../utils/get-config");
const { EmbedBuilder } = require("discord.js");
const err_embed = require("../utils/error-embed");
const postExpansionSettingsModel = require("../utils/Schema/PostExpansionSettingsSchema");
const color = require("../utils/color-code");

exports.run = async (client, message) => {
    try {
        const postExpansionSettingsData = await postExpansionSettingsModel.findOne({ _id: message.author.id });
        const args = message.content.split(" ").slice(1);
        const input = args.join(" ");
        if (!postExpansionSettingsData) {
            message.channel.send({ embeds: [err_embed.main] });
            logger.error(
                "ユーザーID: " +
                    message.author.id +
                    " のTwitter投稿展開機能を設定しようとしましたがプロファイルデータがありませんでした..."
            );
            return;
        }
        const err_no_argument = new EmbedBuilder({
            title: "Twitter投稿展開機能の設定",
            description: "コマンド実行エラー: 引数が指定されていません",
            color: color.ERROR,
            fields: [
                {
                    name: "コマンド実行に必要な引数",
                    value: "`set-twitter-url-show <true|false>`",
                },
                {
                    name: "実行例: ",
                    value: "`set-twitter-url-show true`",
                },
            ],
        });
        if (!input) {
            message.channel.send({ embeds: [err_no_argument] });
            return;
        }
        const err_invalid_argument = new EmbedBuilder({
            title: "Twitter投稿展開機能の設定",
            description: "コマンド実行エラー: 引数がtrue/false以外です",
            color: color.ERROR,
            fields: [
                {
                    name: "コマンド実行に必要な引数",
                    value: "`set-twitter-url-show <true|false>`",
                },
                {
                    name: "実行例: ",
                    value: "`set-twitter-url-show true`",
                },
            ],
        });
        if (input !== "true" && input !== "false") {
            message.channel.send({ embeds: [err_invalid_argument] });
            return;
        }

        //設定内容を反映
        await postExpansionSettingsData.updateOne({
            x_twitter_show: input,
        });
        const update_success = new EmbedBuilder({
            title: "Twitter投稿展開機能の設定",
            description: "DBに保存されているTwitter投稿展開機能の設定を更新しました",
            color: 3853014, //★設定更新系の色を新しく定義したい。
            fields: [
                {
                    name: "Twitter投稿展開機能の現在の設定",
                    value: "`" + input + "`",
                },
            ],
            timestamp: new Date(),
        });
        message.channel.send({ embeds: [update_success] });
    } catch (err) {
        logger.error("コマンド実行エラーが発生しました");
        logger.error(err);
        message.channel.send({ embeds: [err_embed.main] });
        if (config.debug.enable.includes("true")) {
            message.channel.send({ embeds: [err_embed.debug] });
            message.channel.send("エラー内容: ");
            message.channel.send("```\n" + err + "\n```");
        }
    }
};
exports.name = "set-twitter-url-show";
