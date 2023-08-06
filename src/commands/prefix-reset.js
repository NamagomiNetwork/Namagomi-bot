const logger = require('../modules/logger')
const config = require('../utils/get-config');
const check_admin = require('../utils/check-admin')
const profileModel = require('../utils/Schema/ProfileSchema');
const { MessageEmbed } = require('discord.js');
const err_embed = require('../utils/error-embed')

exports.run = async (client, message, args) => {
    try {
            // 権限の確認
            var permission_check = check_admin(message, client)

            if (permission_check == ('owner: no')){
                return;
            }
            
            const args = message.content.split(" ").slice(1);
            const input = args.join(" ")

            // ユーザーIDが指定されていない場合
            var err_argument = new MessageEmbed({
                title: "prefixのreset",
                description: "コマンド実行エラー: 引数が指定されていません",
                color: 16601703,
                fields: [
                    {
                        name: "コマンド実行に必要な引数",
                        value: "`prefix-reset 【リセットするユーザーID】`"
                    },
                    {
                        name: "実行例: ",
                        value: "`prefix-reset 927919368665456710`"
                    },
                ]
            })

            if(!input){
                message.channel.send({ embeds: [err_argument]})
                return;
            }

            const profileData = await profileModel.findOne({ _id: input });

            if (!profileData) {
                message.channel.send(({embeds: [err_embed.main]}))
                message.channel.send("ユーザープロファイルが見つかりませんでした")
                logger.error("ユーザーID: " + input + " のprefixを設定しようとしましたがプロファイルデータがありませんでした...")
                return;
            }
        

            // データを設定
            await profileData.updateOne({
                prefix:  config.bot.prefix,
            })

            var success = new MessageEmbed({
                title: "prefixのリセット",
                description: "prefix(接頭辞)をリセットしました",
                color: 3853014,
                fields: [
                    {
                        name: "リセットしたユーザー",
                        value: "`"+ input + "`"
                    },
                    {
                        name: "設定したprefix",
                        value: "`"+  config.bot.prefix + "`"
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

exports.name = "prefix-reset";