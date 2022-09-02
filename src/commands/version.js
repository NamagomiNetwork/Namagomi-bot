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
            child.exec("git rev-parse --short HEAD", (err, res) =>{
                if(err){
                var commit_short_hash = "取得エラーが発生しました..."
                return;
                } else {
                    var commit_short_hash = res
                }
            
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
            })
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