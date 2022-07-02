const { MessageEmbed } = require('discord.js');
const logger = require('../modules/logger')
const package = require('../../package.json');
const config = require('../utils/get-config')
const prefix = config.prefix

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

exports.name = "about";