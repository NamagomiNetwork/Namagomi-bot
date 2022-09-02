const { MessageEmbed } = require('discord.js');
const logger = require('../modules/logger')
const config = require('../utils/get-config')
const embed = require('./utils/help-embed')
const err_embed = require('../utils/error-embed')

exports.run = (client, message, args) => {
    try{
        message.channel.send({embeds: [embed.page3]})
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

exports.name = "help-3";