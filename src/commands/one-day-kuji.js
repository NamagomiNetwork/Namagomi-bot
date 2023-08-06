const logger = require('../modules/logger')
const err_embed = require('../utils/error-embed')
const OmikujiModel = require('../utils/Schema/OmikujiSchema')
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    try{
            const OmikujiData = await OmikujiModel.findOne({ _id: message.author.id });
            
            if (!OmikujiData) {
                logger.error("ユーザー名: " + message.author.username + " ユーザーID: " + message.author.id + "のおみくじプロファイル作成中にエラーが発生しました...")
                message.channel.send(({embeds: [err_embed.main]}))
                return;
            }

            
            if(OmikujiData.one_day_omikuji_feature.includes("true")){
                var disenable = new MessageEmbed({
                    title: "1日1おみくじの無効化",
                    description: "1日1おみくじを無効化しました",
                    color: 5301186,
                    "footer": {
                        "text": "ぶひ"
                    },
                    fields: [
                        {
                            name: "有効化するには",
                            value: "もういっかいこのコマンドを実行してください"
                        },
                    ]
                })
                message.channel.send({embeds: [disenable]})
                await OmikujiData.updateOne({
                    one_day_omikuji_feature: false,
                })
                return
            } else {
                var enable = new MessageEmbed({
                    title: "1日1おみくじの有効化",
                    description: "1日1おみくじを有効化しました",
                    color: 5301186,
                    "footer": {
                        "text": "ぶひ"
                    },
                    fields: [
                        {
                            name: "無効化するには",
                            value: "もういっかいこのコマンドを実行してください"
                        },
                    ]
                })
                message.channel.send({embeds: [enable]})
                await OmikujiData.updateOne({
                    one_day_omikuji_feature: true,
                })
            }
        } catch (err) {
            logger.error("コマンド実行エラーが発生しました")
            logger.error(err)
            message.channel.send(({embeds: [err_embed.main]}))
            if(config.debug.enable.includes("true")){
                message.channel.send(({embeds: [err_embed.debug]}))
                message.channel.send("エラー内容: ")
                message.channel.send("```\n"+ err + "\n```")
            }
    }
}

exports.name = "omikuji";
