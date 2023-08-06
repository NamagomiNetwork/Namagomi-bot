const { MessageEmbed } = require('discord.js');
const package = require('../../package.json');
const os = require('os')
const logger = require('../modules/logger')
const err_embed = require('../utils/error-embed')

exports.run = (client, message, args) => {
    try{
        let user_id = (message.mentions.members.size > 0) ? message.mentions.members.first().id : args[0];
        if (!user_id) return message.channel.send({ content: "エラー: IDが入力されていません" });
    
        const member = message.guild.members.cache.get(user_id);
        if (!member) return message.channel.send({ content: "エラー: 指定されたIDが見つかりません" })
    
        const presence_data = {"online": "オンライン", "offline": "オフライン", "dnd": "取り込み中", "idle": "退席中"}
        message.channel.send({
            embeds:[
                {
                    title: `───${member.user?.username}の情報───`,
                    description: `${member.user?.username}の情報を表示しています`,
                    color: "RANDOM",
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.guild.iconURL(),
                        text: `サーバー名：${message.guild.name}`
                    },
                    thumbnail: {
                        url: member.user.avatarURL()
                    },
                    fields: [
                        {
                            name: "ユーザータグ",
                            value: `${member.user.tag}`
                        },
                        {
                            name: "ユーザーメンション",
                            value: `${member}`
                        },
                        {
                            name: "ユーザーID",
                            value: `${member.id}`
                        },
                        {
                            name: "アカウントの種類",
                            value: member.bot ? "BOT" : "ユーザー",
                            inline: true
                        },
                        {
                            name: "現在のステータス",
                            value: `${presence_data[member.presence?.status]}`,
                            inline: true
                        },
                        {
                            name: "userguild",
                            value: `${member.guild}`
                        }
                    ]
                }
            ]
            
        });
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

exports.name = "user";