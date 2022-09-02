const { MessageEmbed } = require('discord.js');
const package = require('../../package.json');
const logger = require('../modules/logger')
const config = require('../utils/get-config');
const sleep = require('../modules/sleep')
const check_admin = require('../utils/check-admin')
const err_embed = require('../utils/error-embed')

exports.run = (client, message, args) => {
    try{
        var permission_check = check_admin(message, client)
        
        if (permission_check == ('owner: no')){
            return;
        }

        if ( config.bot.owner.includes(message.author.id)){
            logger.info("システムを終了します...")
            var data = new MessageEmbed({
                title: "システムの終了",
                description: "システムを終了を開始します... \n まもなくbotがシャットダウンします",
                color: 3853014,
                timestamp: new Date()
            })
            async function send_msg(){
                await message.channel.send(({embeds: [data]}))
                process.exit(0)
            }
            send_msg()
        }
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

exports.name = "shutdown";