const { MessageEmbed } = require('discord.js');
const logger = require('../modules/logger')
const err_embed = require('../utils/error-embed')

exports.run = (client, message, args) => {
    try{
        var embed = new MessageEmbed({
            title: "ðpong!",
            description: "pingå¤ãè¡¨ç¤ºãã¾ã",
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
            logger.error("ã³ãã³ãå®è¡ã¨ã©ã¼ãçºçãã¾ãã")
            logger.error(err)
            message.channel.send(({embeds: [err_embed.main]}))
            if(config.debug.enable.includes("true")){
                message.channel.send(({embeds: [err_embed.debug]}))
                message.channel.send("ã¨ã©ã¼åå®¹: ")
                message.channel.send("```\n"+ err + "\n```")
            }
    }
}

exports.name = "ping";