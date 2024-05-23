const logger = require('../modules/logger')
const config = require('../utils/get-config');
const err_embed = require('../utils/error-embed');
const OmikujiModel = require('../utils/Schema/OmikujiSchema')
const profileModel = require('../utils/Schema/ProfileSchema');
const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
    try{
        function ko(){
            const arr = ["や！","こばわ"];
            const random = Math.floor(Math.random() * arr.length);
            const result_ko = arr[random];
            message.channel.send({content: result_ko});
            return result_ko;
        }

        function namagomi(){
            const arr = ["生ゴミ", "黙れゴミ"];
            const random = Math.floor(Math.random() * arr.length);
            const result_namagomi = arr[random];
            message.channel.send({content: result_namagomi});
            return result_namagomi;
        }

        function buta(){
            const arr = ["黙れ豚", "しね豚"];
            const random = Math.floor(Math.random() * arr.length);
            const result_buta = arr[random];
            message.channel.send({content: result_buta});
            return result_buta;
        }
        
        const OmikujiData = await OmikujiModel.findOne({ _id: message.author.id });
        const profileData = await profileModel.findOne({ _id: message.author.id });
        if (!OmikujiData) {
            logger.error("ユーザー名: " + message.author.username + " ユーザーID: " + message.author.id + "のおみくじプロファイルが見つかりませんでした...")
            message.channel.send(({embeds: [err_embed.main]}))
            return;
        }
        if (!profileData) {
            logger.error("ユーザー名: " + message.author.username + " ユーザーID: " + message.author.id + "のプロファイルが見つかりませんでした...")
            message.channel.send(({embeds: [err_embed.main]}))
            return;
        }
        if(OmikujiData.one_day_omikuji_feature.includes("true")){
            if(OmikujiData.one_day_omikuji.includes("true")){
                let sudeni_1day_true = new MessageEmbed({
                    title: "おみくじ",
                    description: "すでに今日はおみくじを実行しています",
                    color: 5301186,
                    "footer": {
                        "text": "ぶひ"
                    },
                    fields: [
                        {
                            name: "この機能を無効化するには",
                            value: "`" + profileData.prefix + "one-day-kuji` コマンドを実行してください"
                        },
                    ]
                })
                message.channel.send({embeds: [sudeni_1day_true]})
                return;
            }
        }

        let result;
        let unique;
        //ごみ
        if(message.author.id.includes("538308521985572867")){
            let random = Math.floor(Math.random() * 2);
            if(random == 1){
                unique = "true"
                result = namagomi()
            }
        }
        //ko
        if(message.author.id.includes("666277504260112429")){
            let random = Math.floor(Math.random() * 2);
            if(random == 1){
                unique = "true"
                result = ko()
            }    
        }
        //ぶた
        if(message.author.id.includes("281902125909409792")){
            let random = Math.floor(Math.random() * 2);
            if(random == 1){
                unique = "true"
                result = buta()
            }    
        }
        if (unique != "true"){
            const arr = ["ちょうだいきち", "大吉", "吉", "中吉", "小吉", "半吉", "ぶひ吉", "区", "凶", "大凶", "ちょうだいきょう", "ﾌﾞｯｸﾌﾞｯｸ", "ﾌｸﾞｩ🐡"];
            let random = Math.floor(Math.random() * arr.length);
            result = arr[random];
        
            let maeno_data = OmikujiData.mae_no_omikuji_kekka
            let success = new MessageEmbed({
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
        }
        if(OmikujiData.one_day_omikuji_feature.includes("true")){
            await OmikujiData.updateOne({
                one_day_omikuji: true,
            })
        }
        await OmikujiData.updateOne({
            mae_no_omikuji_kekka: result,
        })
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
