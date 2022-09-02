const logger = require('../modules/logger')
const config = require('../utils/get-config');
const check_admin = require('../utils/check-admin')
const profileModel = require('../utils/Schema/ProfileSchema');
const { MessageEmbed } = require('discord.js');
const err_embed = require('../utils/error-embed')

exports.run = async (client, message, args) => {
    try {
            // Get our input arguments
            const profileData = await profileModel.findOne({ _id: message.author.id });
            const args = message.content.split(" ").slice(1);
            const input = args.join(" ")

            if (!profileData) {
                message.channel.send(({embeds: [err_embed.main]}))
                logger.error("ユーザーID: " + message.author.id + " のprefixを設定しようとしましたがプロファイルデータがありませんでした...")
                return;
            }
            
            // 文字列がない場合
            var err_argument = new MessageEmbed({
                title: "prefixの設定",
                description: "コマンド実行エラー: 引数が指定されていません",
                color: 16601703,
                fields: [
                    {
                        name: "コマンド実行に必要な引数",
                        value: "`set-prefix 【新しいprefix】`"
                    },
                    {
                        name: "実行例: ",
                        value: "`set-prefix $.`"
                    },
                ]
            })
            if(!input){
                message.channel.send({ embeds: [err_argument]})
                return;
            }

            // データを設定
            await profileData.updateOne({
                prefix: input,
            })

            var success = new MessageEmbed({
                title: "prefixの設定",
                description: "prefix(接頭辞)を更新しました",
                color: 3853014,
                fields: [
                    {
                        name: "新しいprefix",
                        value: "`"+ input + "`"
                    },
                    {
                        name: "今後のコマンド例",
                        value: input  + "help"
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

exports.name = "set-prefix";