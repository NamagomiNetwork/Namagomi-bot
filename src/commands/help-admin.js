const { MessageEmbed } = require('discord.js');
const logger = require('../modules/logger')
const config = require('../utils/get-config')

exports.run = (client, message, args) => {
    try{
        const prefix = config.prefix
        var embed = new MessageEmbed({
            title: "help-admin",
            description: "このコマンドはconfig.jsonで指定したユーザーのみ実行可能です",
            color: 0xffff12,
            fields: [
                {
                    name: prefix + "shell [実行するshellコマンド]",
                    value: "shellコマンドを実行します"
                },
                {
                    name: prefix + "eval [評価するコード]",
                    value: "JavaScriptコードを評価,実行します"
                },
                {
                    name: prefix + "shutdown",
                    value: "botをシャットダウンします"
                },
                {
                    name: prefix + "reload [コマンド名]",
                    value: "コマンドをリロードします(開発用コマンド)"
                },
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

exports.name = "help-admin";