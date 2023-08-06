const logger = require('../modules/logger')
const config = require('../utils/get-config');
const check_admin = require('../utils/check-admin')
const TawasiModel = require('../utils/Schema/TawasiSchema');
const { MessageEmbed } = require('discord.js');
const err_embed = require('../utils/error-embed')

exports.run = async (client, message, args) => {
    try {
            var permission_check = check_admin(message, client)
            
            if (permission_check == ('owner: no')){
                return;
            }

            const args = message.content.split(" ").slice(1);
            const input = args.join(" ")

            const tawasiData = await TawasiModel.findOne({ _id: input });
            if (!tawasiData) {
                message.channel.send(({embeds: [err_embed.main]}))
                logger.error("ユーザーID: " + input + " の1日1たわしさんをリセットしようとしましたがプロファイルデータがありませんでした...")
                return;
            }
            
            // 文字列がない場合
            var err_argument = new MessageEmbed({
                title: "1日1たわしさんのリセット",
                description: "コマンド実行エラー: 引数が指定されていません",
                color: 16601703,
                fields: [
                    {
                        name: "コマンド実行に必要な引数",
                        value: "`reset-tawasi 【ユーザーID】`"
                    },
                ]
            })

            if(!input){
                message.channel.send({ embeds: [err_argument]})
                return;
            }

            // データを設定
            await tawasiData.updateOne({
                tawasi: false,
            })

            var success = new MessageEmbed({
                title: "1日1たわしさんのリセット",
                description: "1日1たわしさんをリセット",
                color: 3853014,
                fields: [
                    {
                        name: "リセットしたユーザーID: ",
                        value: "`"+ input + "`"
                    },
                ]
            })
            message.channel.send(({embeds: [success]}))
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

exports.name = "reset-tawasi";