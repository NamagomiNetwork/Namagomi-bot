const { MessageEmbed } = require('discord.js');
const package = require('../../package.json');
const logger = require('../modules/logger')
const config = require('../utils/get-config');
const sleep = require('../modules/sleep')
const notadmin = require('../utils/not-admin');

exports.run = (client, message, args) => {
    try{
        var syslog = new MessageEmbed({
            title: "権限がない人がコマンドを実行しようとしました",
            description: "このメッセージはBotownerでない人が実行しようとしたため送信します",
            fields: [{
                    name: "ユーザーID",
                    value: message.author.id
                },
            ]
        })
    
        if(!config.command_settings.shutdown.includes("true")){
            return;
        }

        if (!config.owner.includes(message.author.id)){
            message.channel.send({embeds: [notadmin.embed]})
            // ログとして送信
            client.channels.cache.get(config.syslog).send({embeds: [syslog]})
            logger.warn("権限のない人が管理コマンドを実行しました")
            return;
        }
    
        if (config.owner.includes(message.author.id)){
            sleep(4000)
            logger.info("Stopping System...")
            process.exit(0)
        }
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

exports.name = "shutdown";