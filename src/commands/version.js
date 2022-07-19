const { MessageEmbed } = require('discord.js');
const package = require('../../package.json');
const os = require('os')
const logger = require('../modules/logger')
const err_embed = require('../utils/error-embed')
const child = require('child_process')
const config = require('../utils/get-config')
const sleep = require('../modules/sleep')
exports.run = (client, message, args) => {

    try{
    // commit情報を取得
        async function get_commit_short(){
            await child.exec("git rev-parse --short HEAD", (err, res) =>{
                if(err){
                return "Error"
                } else {
                    logger.info(res)
                    return res;
                }
            })
        }
        commit_short_hash = get_commit_short() + "."
        logger.info(commit_short_hash)

        var embed = new MessageEmbed({
            title: "Version",
            color: 5301186,
            "footer": {
                "text": "Version"
            },
            fields: [
                {
                    name: "commit short hash",
                    value: commit_short_hash
                },
                {
                    "name": "bot-version",
                    "value": package.version,
                    "inline": true
                  },
                  {
                    "name": "Discord.js Version",
                    "value": require('discord.js').version,
                    "inline": true
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

exports.name = "version";