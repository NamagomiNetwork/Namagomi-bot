const { MessageEmbed } = require('discord.js');
const package = require('../package.json');
const os = require('os')
const logger = require('../modules/logger')

exports.run = (client, message, args) => {

    try{
    // 空きメモリを計算
    const freemem_byte = os.freemem
    const freemem_kb = freemem_byte /1024
    const freemem = freemem_kb /1024
    var embed = new MessageEmbed({
        title: "SystemStatus",
        color: 5301186,
        "footer": {
            "text": "System Status"
        },
        fields: [
            {
                name: "Os Information",
                value: os.version + " " + os.arch
            },
            {
                name: "Free Memory",
                value: freemem + " MB"
            },
            {
                "name": "bot-version",
                "value": package.version,
                "inline": true
              },
              {
                "name": "Discord.js Version",
                "value": package.dependencies['discord.js'],
                "inline": true
              }
        ]
    })
    message.channel.send({embeds: [embed]})
    } catch (err) {
        // メッセージが送れない可能性を考慮(送れなくてbotが落ちるってのを防ぐ)
      try{
      var error_msg = new MessageEmbed({
          title: "コマンドの実行に失敗しました...",
          color: 16601703,
          fields: [
              {
                  name: "エラー内容",
                  value: "```\n"+ err + "\n```"
              }
          ]
      })
    
      logger.error("コマンド実行エラーが発生しました")
      logger.error(err)
      message.channel.send(({embeds: [error_msg]}))
      } catch(send_error){
          logger.error("Discordへのメッセージ送信に失敗しました...")
          logger.error(send_error)
      }
    }
}

exports.name = "status";