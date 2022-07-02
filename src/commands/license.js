const { MessageEmbed } = require('discord.js');
const logger = require('../modules/logger')

exports.run = (client, message, args) => {
    try{
        var license = "MIT License \nCopyright (c) 2022 NamagomiNetwork"
        var license_url = "https://github.com/NamagomiNetwork/namagomi-bot/blob/main/LICENCE"
        var embed = new MessageEmbed({
            title: "Bot License",
            color: 0xffff12,
            fields: [
                {
                    name: "License",
                    value: "```\n"+ license + "\n```"
                },
                {
                    name: "License全文",
                    value: license_url
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

exports.name = "license";