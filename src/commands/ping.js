const { MessageEmbed } = require('discord.js');
const logger = require('../modules/logger')
const err_embed = require('../utils/error-embed')

exports.run = (client, message, args) => {
    try{
        var embed = new MessageEmbed({
            title: "🏓pong!",
            description: "ping値を表示します",
            color: 0xffff12,
            timestamp: new Date(),
            fields: [{
                    name: "WebSocket",
                    value: client.ws.ping + "ms"
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

exports.name = "ping";