const { MessageEmbed } = require('discord.js');
const logger = require('../modules/logger')
const config = require('../utils/get-config')
const err_embed = require('../utils/error-embed')
const discord_job = require("discord-job-panel");

exports.run = (client, message, args) => {
    try{
        const getdata = discord_job.create_panel({role: args,in:message,title: "ロールを選ぼう"});
        if (getdata==1) return message.reply("入力されていません");
        if(getdata==2)return message.reply("ロールが見つかりませんでした");
        for(let i=0; i < getdata.content.length; i++)message.reply({embeds:[{description: getdata.content[i].join("\n")}],components: [getdata.select[i]]});
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

exports.name = "role-setup";