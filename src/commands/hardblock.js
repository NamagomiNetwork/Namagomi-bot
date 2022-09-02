const logger = require('../modules/logger')
const config = require('../utils/get-config');
const check_admin = require('../utils/check-admin')
const profileModel = require('../utils/Schema/ProfileSchema');
const { MessageEmbed } = require('discord.js');
const BlockUserModel = require('../utils/Schema/BlockUserSchema');
const err_embed = require('../utils/error-embed')

exports.run = async (client, message, args) => {
    try {
            var permission_check = check_admin(message, client)
            
            if (permission_check == ('owner: no')){
                return;
            }

            const args = message.content.split(" ").slice(1);
            const input = args.join(" ")

            // ユーザーIDが指定されていない場合
            var err_argument = new MessageEmbed({
                title: "ハードブロック",
                description: "コマンド実行エラー: 引数が指定されていません",
                color: 16601703,
                fields: [
                    {
                        name: "コマンド実行に必要な引数",
                        value: "`hardblock 【ハードブロックするユーザーID】`"
                    },
                    {
                        name: "実行例: ",
                        value: "`hardblock 927919368665456710`"
                    },
                ]
            })

            if(!input){
                message.channel.send({ embeds: [err_argument]})
                return;
            }

            const profileData = await profileModel.findOne({ _id: input });

            if (!profileData) {
                message.channel.send("エラー: ユーザープロファイルが見つかりませんでした")
                logger.error("ユーザーID: " + input + " のプロファイルを確認しようとしましたがプロファイルデータがありませんでした...")
                return;
            }
        
            // block profileの確認
            const BlockData = await BlockUserModel.findOne({ _id: input });
            if (!BlockData) {
                message.channel.send("エラー: ユーザーブロックプロファイルが見つかりませんでした")
                logger.error("ユーザーID: " + input + " のブロックプロファイルを確認しようとしましたがプロファイルデータがありませんでした...")
                return;
            }
            
            // ハードブロックの前に通常のブロックがされているか確認
            if(!BlockData.enable.includes("true")){
                message.channel.send("エラー: ハードブロックの前に `block` コマンドを実行してください")
                return
            } 

            if (config.bot.owner.includes(input)){
                message.channel.send("さすがにbotのownerをブロックすることはできません")
                return;
            }

            await BlockData.updateOne({
                hardblock: true,
            })

            var data = new MessageEmbed({
                title: "ハードブロック",
                description: "ユーザーをハードブロックしました",
                color: 3853014,
                timestamp: new Date(),
                thumbnail: {
                    url: profileData.avatar
                },
                fields: [
                    {
                        name: "ユーザーID: ",
                        value: "`"+ input + "`",
                        inline: true
                    },
                    {
                        name: "ユーザー名: ",
                        value: "`"+ profileData.name + "`",
                        inline: true
                    },
                    {
                        name: "Note: ",
                        value: "ブロックを解除する場合は `unblock` コマンドを \n ハードブロックを解除する場合は `unhardblock` コマンドを実行してください",
                    },
                ]
            })
            message.channel.send(({embeds: [data]}))
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

exports.name = "hardblock";