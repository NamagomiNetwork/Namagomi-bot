const logger = require('../modules/logger')
const err_embed = require('../utils/error-embed');
const OmikujiModel = require('../utils/Schema/OmikujiSchema')
const { MessageEmbed } = require('discord.js');
exports.run = (client, message, args) => {
    try{       
        function bukkubukku(){
        let arr = ["ﾌﾞｯｸﾌﾞｯｸ", "本が溺れた。ﾌﾞｯｸﾌﾞｯｸｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗ"];
        var random = Math.floor(Math.random() * arr.length);
        var result = arr[random];
        message.channel.send({content: result});
        }
        //ごみ
        function namagomi(){
        let arr = ["生ゴミ", "黙れゴミ"];
        var random = Math.floor(Math.random() * arr.length);
        var result = arr[random];
        message.channel.send({content: result});
        }
        
        if(message.author.id.includes("538308521985572867")){
            namagomi()
            return;
        }
        
        async function run() {
            const OmikujiData = await OmikujiModel.findOne({ _id: message.author.id });
            if (!OmikujiData) {
                logger.error("ユーザー名: " + message.author.username + " ユーザーID: " + message.author.id + "のおみくじプロファイルが見つかりませんでした発生しました...")
                message.channel.send(({embeds: [err_embed.main]}))
                return;
            }
            if(OmikujiData.one_day_omikuji_feature.includes("true")){
                if(OmikujiData.one_day_omikuji.includes("true")){
                    var sudeni_1day_true = new MessageEmbed({
                        title: "1日1おみくじ",
                        description: "すでに1日1おみくじを実行しています",
                        color: 5301186,
                        "footer": {
                            "text": "ぶひ"
                        },
                        fields: [
                            {
                                name: "この機能を無効化するには",
                                value: "g!one-day-kuji コマンドを実行してください"
                            },
                        ]
                    })
                    message.channel.send({embeds: [sudeni_1day_true]})
                    return;
                }
            }
            let arr = ["大吉", "中吉", "小吉", "吉", "凶", "大凶", "ﾌﾞｯｸﾌﾞｯｸ", "ぶひ吉", "ちょうだいきち", "ちょうだいきょう", "ﾌｸﾞｩ🐡"];
            var random = Math.floor(Math.random() * arr.length);
            var result = arr[random];

            var maeno_data = OmikujiData.mae_no_omikuji_kekka
            var success = new MessageEmbed({
                title: "おみくじ",
                description: "おみくじをしたよ～",
                color: 5301186,
                "footer": {
                    "text": "ぶひ"
                },
                fields: [
                    {
                        name: "結果: ",
                        value: result
                    },
                    {
                        name: "前回の結果: ",
                        value: maeno_data
                    },
                ]
            })
            message.channel.send({embeds: [success]})
            if(OmikujiData.one_day_omikuji_feature.includes("true")){
                await OmikujiData.updateOne({
                    one_day_omikuji: true,
                })
            }
            await OmikujiData.updateOne({
                mae_no_omikuji_kekka: result,
            })
        }
        run()
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
