const logger = require("../modules/logger");
const color = require("../utils/color-code");
const OmikujiModel = require("../utils/Schema/OmikujiSchema");
const { EmbedBuilder } = require("discord.js");
const sendErrorMessage = require("../modules/error-message");

exports.run = async (client, message) => {
    try {
        const OmikujiData = await OmikujiModel.findOne({ _id: message.author.id });

        if (!OmikujiData) {
            logger.error(
                "ユーザー名: " +
                    message.author.username +
                    " ユーザーID: " +
                    message.author.id +
                    "のおみくじプロファイル作成中にエラーが発生しました..."
            );
            message.channel.send({ embeds: [err_embed.main] });
            return;
        }

        if (OmikujiData.one_day_omikuji_feature.includes("true")) {
            const disenable = new EmbedBuilder({
                title: "1日1おみくじの無効化",
                description: "1日1おみくじを無効化しました",
                color: color.CMD_RUN,
                footer: {
                    text: "ぶひ",
                },
                fields: [
                    {
                        name: "有効化するには",
                        value: "もういっかいこのコマンドを実行してください",
                    },
                ],
            });
            message.channel.send({ embeds: [disenable] });
            await OmikujiData.updateOne({
                one_day_omikuji_feature: false,
            });
            return;
        } else {
            const enable = new EmbedBuilder({
                title: "1日1おみくじの有効化",
                description: "1日1おみくじを有効化しました",
                color: color.CMD_RUN,
                footer: {
                    text: "ぶひ",
                },
                fields: [
                    {
                        name: "無効化するには",
                        value: "もういっかいこのコマンドを実行してください",
                    },
                ],
            });
            message.channel.send({ embeds: [enable] });
            await OmikujiData.updateOne({
                one_day_omikuji_feature: true,
            });
        }
    } catch (err) {
        sendErrorMessage(err, message);
    }
};

exports.name = "omikuji";
