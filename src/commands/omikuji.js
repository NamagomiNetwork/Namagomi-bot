const logger = require("../modules/logger");
const color = require("../utils/color-code");
const OmikujiModel = require("../utils/Schema/OmikujiSchema");
const profileModel = require("../utils/Schema/ProfileSchema");
const { EmbedBuilder } = require("discord.js");
const sendErrorMessage = require("../modules/error-message");

exports.run = async (client, message) => {
    try {
        //プロファイルチェック
        const OmikujiData = await OmikujiModel.findOne({ _id: message.author.id });
        const profileData = await profileModel.findOne({ _id: message.author.id });
        if (!OmikujiData || !profileData) {
            logger.error(
                "ユーザー名: " +
                    message.author.username +
                    " ユーザーID: " +
                    message.author.id +
                    "のおみくじプロファイルが見つかりませんでした..."
            );
            message.channel.send({ embeds: [err_embed.main] });
            return;
        }
        if (OmikujiData.one_day_omikuji_feature.includes("true")) {
            if (OmikujiData.one_day_omikuji.includes("true")) {
                let sudeni_1day_true = new EmbedBuilder({
                    title: "おみくじ",
                    description: "すでに今日はおみくじを実行しています",
                    color: color.CMD_RUN,
                    footer: {
                        text: "ぶひ",
                    },
                    fields: [
                        {
                            name: "この機能を無効化するには",
                            value: "`" + profileData.prefix + "one-day-kuji` コマンドを実行してください",
                        },
                    ],
                });
                message.channel.send({ embeds: [sudeni_1day_true] });
                return;
            }
        }

        //変数宣言
        let result = "";
        let unique = false;
        const arrKo = ["や！", "こばわ"];
        const arrButa = ["黙れ豚", "しばくぞ豚"];
        const arrNamagomi = ["生ゴミ", "黙れゴミ"];

        //個人用おみくじ
        const uniqueOmikuji = (arr) => {
            if (Math.random() < 0.5) {
                const randomNum = Math.floor(Math.random() * arr.length);
                result = arr[randomNum];
                message.channel.send({ content: result });
                unique = true;
                return;
            }
        };
        if (message.author.id.includes("538308521985572867")) {
            //namagomi
            uniqueOmikuji(arrNamagomi);
        } else if (message.author.id.includes("666277504260112429")) {
            //ko
            uniqueOmikuji(arrKo);
        } else if (message.author.id.includes("281902125909409792")) {
            //ぶた
            uniqueOmikuji(arrButa);
        }

        //通常おみくじ
        if (!unique) {
            const arr = [
                "ちょうだいきち",
                "大吉",
                "吉",
                "中吉",
                "小吉",
                "半吉",
                "ぶひ吉",
                "区",
                "凶",
                "大凶",
                "ちょうだいきょう",
                "ﾌﾞｯｸﾌﾞｯｸ",
                "ﾌｸﾞｩ🐡",
            ];
            let randomNum = Math.floor(Math.random() * arr.length);
            result = arr[randomNum];

            let maeno_data = OmikujiData.mae_no_omikuji_kekka;
            let success = new EmbedBuilder({
                title: "おみくじ",
                description: "おみくじをしたよ～",
                color: color.CMD_RUN,
                footer: {
                    text: "ぶひ",
                },
                fields: [
                    {
                        name: "結果: ",
                        value: result,
                    },
                    {
                        name: "前回の結果: ",
                        value: maeno_data,
                    },
                ],
            });
            message.channel.send({ embeds: [success] });
        }
        if (OmikujiData.one_day_omikuji_feature.includes("true")) {
            await OmikujiData.updateOne({
                one_day_omikuji: true,
            });
        }
        await OmikujiData.updateOne({
            mae_no_omikuji_kekka: result,
        });
    } catch (err) {
        sendErrorMessage(err, message);
    }
};

exports.name = "omikuji";
