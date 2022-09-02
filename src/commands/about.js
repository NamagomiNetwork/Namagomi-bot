const { MessageEmbed } = require('discord.js');
const logger = require('../modules/logger')
const package = require('../../package.json');
const config = require('../utils/get-config')
const prefix =  config.bot.prefix
const err_embed = require('../utils/error-embed')

exports.run = (client, message, args) => {
    try{
        var embed = new MessageEmbed({
            title: "about",
            description: "botの詳細を表示します",
            color: 0xffff12,
            fields: [
                {
                    name: "Repository",
                    value: "https://github.com/NamagomiNetwork/Namagomi-bot"
                },
                {
                    name: "License",
                    value: "`"+ prefix + "license` で確認をお願いします"
                },
                {
                    name: "Botバージョン",
                    value: package.version
                }
            ]
        })
        message.channel.send({embeds: [embed]})
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

exports.name = "about";