const logger = require("../modules/logger");
const config = require("../utils/get-config");
const check_admin = require("../utils/check-admin");
const profileModel = require("../utils/Schema/ProfileSchema");
const { EmbedBuilder } = require("discord.js");
const BlockUserModel = require("../utils/Schema/BlockUserSchema");
const TawasiModel = require("../utils/Schema/TawasiSchema");
const OmikujiModel = require("../utils/Schema/OmikujiSchema");
const PostExpansionSettingsModel = require("../utils/Schema/PostExpansionSettingsSchema");
const err_embed = require("../utils/error-embed");
const color = require("../utils/color-code");

exports.run = async (client, message) => {
    try {
        // 権限の確認
        const permission_check = check_admin(message, client);

        if (permission_check == "owner: no") {
            return;
        }

        const args = message.content.split(" ").slice(1);
        let input = args.join(" ");
        const result = input.match(/[0-9]+/);
        if (result) {
            input = result[0];
        }

        // ユーザーIDが指定されていない場合
        const err_argument = new EmbedBuilder({
            title: "ユーザー情報確認",
            description: "コマンド実行エラー: 引数が指定されていません",
            color: color.ERROR,
            fields: [
                {
                    name: "コマンド実行に必要な引数",
                    value: "`check 【調べるユーザーのID】`",
                },
                {
                    name: "実行例: ",
                    value: "`check 927919368665456710`",
                },
            ],
        });

        if (!input) {
            message.channel.send({ embeds: [err_argument] });
            return;
        }

        const profileData = await profileModel.findOne({ _id: input });

        if (!profileData) {
            message.channel.send({ embeds: [err_embed.main] });
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
            message.channel.send({ embeds: [err_embed.main] });
            message.channel.send("エラー: ユーザーブロックプロファイルが見つかりませんでした");
            logger.error(
                "ユーザーID: " +
                    input +
                    " のブロックプロファイルを確認しようとしましたがプロファイルデータがありませんでした..."
            );
            return;
        }
        const tawasiData = await TawasiModel.findOne({ _id: input });
        if (!tawasiData) {
            message.channel.send({ embeds: [err_embed.main] });
            message.channel.send("エラー: ユーザーたわしプロファイルが見つかりませんでした");
            logger.error(
                "ユーザーID: " +
                    input +
                    " のたわしプロファイルを確認しようとしましたがプロファイルデータがありませんでした..."
            );
            return;
        }
        const OmikujiData = await OmikujiModel.findOne({ _id: input });
        if (!OmikujiData) {
            message.channel.send({ embeds: [err_embed.main] });
            message.channel.send("エラー: ユーザーおみくじプロファイルが見つかりませんでした");
            logger.error(
                "ユーザーID: " +
                    input +
                    " のおみくじプロファイルを確認しようとしましたがプロファイルデータがありませんでした..."
            );
            return;
        }
        const PostExpansionSettingsData = await PostExpansionSettingsModel.findOne({ _id: message.author.id });
        if (!PostExpansionSettingsData) {
            message.channel.send({ embeds: [err_embed.main] });
            logger.error(
                "ユーザーID: " +
                    message.author.id +
                    " のTwitter投稿展開機能を設定しようとしましたがプロファイルデータがありませんでした..."
            );
            return;
        }
        const data = new EmbedBuilder({
            title: "ユーザー情報確認",
            description: "DBに保存されているデータを取得しました",
            color: color.NOTIFY,
            timestamp: new Date(),
            thumbnail: {
                url: profileData.avatar,
            },
            fields: [
                {
                    name: "ユーザー基本情報",
                    value: "DBに保存されている基本的なデータを表示します",
                },
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
                    name: "ユーザーその他情報",
                    value: "DBに保存されている設定情報を表示します",
                },
                {
                    name: "prefix: ",
                    value: "`" + profileData.prefix + "`",
                    inline: true,
                },
                {
                    name: "1dayおみくじ: ",
                    value: "`" + OmikujiData.one_day_omikuji_feature + "`",
                    inline: true,
                },
                {
                    name: "1dayたわしさん: ",
                    value: "`" + tawasiData.one_day_tawasi_feature + "`",
                    inline: true,
                },
                {
                    name: "1日1たわしさん: ",
                    value: "`" + tawasiData.tawasi + "`",
                    inline: true,
                },
                {
                    name: "ユーザーブロック情報",
                    value: "DBに保存されているブロック情報を表示します",
                },
                {
                    name: "ブロックの有無",
                    value: "`" + BlockData.enable + "`",
                    inline: true,
                },
                {
                    name: "ハードブロックの有無",
                    value: "`" + BlockData.hardblock + "`",
                    inline: true,
                },
                {
                    name: "投稿展開設定情報",
                    value: "DBに保存されているブロック情報を表示します",
                },
                {
                    name: "Twitterポスト展開設定有無",
                    value: "`" + PostExpansionSettingsData.x_twitter_show + "`",
                    inline: true,
                },
                {
                    name: "Discord投稿設定有無(未使用)",
                    value: "`" + PostExpansionSettingsData.discord_show + "`",
                    inline: true,
                },
            ],
        });
        message.channel.send({ embeds: [data] });
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

exports.name = "check";
