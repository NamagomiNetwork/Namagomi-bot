const { MessageEmbed } = require('discord.js');
const logger = require('../modules/logger')
const config = require('../get-config')

exports.run = (client, message, args) => {
    try{
        const prefix = config.prefix
        var embed = new MessageEmbed({
            title: "help",
            description: "このbotのヘルプです",
            color: 0xffff12,
            fields: [
                {
                    name: prefix + "help",
                    value: "helpを表示します"
                },
                {
                    name: prefix + "about",
                    value: "botの情報を表示します"
                },
                {
                    name: prefix + "user [メンションもしくはID]",
                    value: "ユーザー情報を表示します"
                },
                {
                    name: prefix + "vote [タイトル] [投票1] [投票2] ● ● ●",
                    value: "投票を行います"
                },
                {
                    name: prefix + "omikuji",
                    value: "おみくじをします"
                },
                {
                    name: prefix + "status",
                    value: "botのステータスを表示します"
                },
                {
                    name: prefix + "help-admin",
                    value: "botの管理コマンドを表示します"
                },
                {
                    name: prefix + "ping",
                    value: "ping値を表示します"
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

exports.name = "help";