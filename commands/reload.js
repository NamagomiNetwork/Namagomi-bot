const logger = require('../modules/logger')
const config = require('../get-config.js');
const notadmin = require('../utils/not-admin');
const { MessageEmbed } = require('discord.js');

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
    
        if (!config.owner.includes(message.author.id)){
            message.channel.send({embeds: [notadmin.embed]})
            // ログとして送信
            client.channels.cache.get(config.syslog).send({embeds: [syslog]})
            logger.warn("権限のない人が管理コマンドを実行しました")
            return;
        }
    
        var not_args = new MessageEmbed({
            title: "リロード失敗",
            description: "コマンドのリロードに失敗しました...",
            color: 13632027,
            fields: [{
                    name: "理由:",
                    value: "リロードするコマンドが入力されていません"
                },
            ]
        })
    
        if (!args || args.length < 1) return message.reply({embeds: [not_args]});
        const commandName = args[0];
        var reload_success = new MessageEmbed({
            title: "リロード成功",
            description: commandName + "コマンドをリロードしました",
            color: 4886754,
            timestamp: new Date(),
        })
    
        var reload_unknown = new MessageEmbed({
            title: "リロード失敗",
            description: commandName + "コマンドのリロードに失敗しました...",
            color: 13632027,
            fields: [{
                    name: "理由:",
                    value: "存在しないコマンド"
                },
            ]
        })
    
        // Check if the command exists and is valid
        if (!client.commands.has(commandName)) {
            logger.error("コマンドのreloadに失敗しました... unknown_command 実行者ID: " + message.author.id)
          return message.reply({embeds: [reload_unknown]});
        }
    
        delete require.cache[require.resolve(`./${commandName}.js`)];
    
        client.commands.delete(commandName);
        const props = require(`./${commandName}.js`);
        client.commands.set(commandName, props);
        message.reply({embeds: [reload_success]});
        logger.info("コマンドのreloadに成功しました! 実行者ID: " + message.author.id + " リロードされたコマンド: " + commandName)
    
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
  };

exports.name = "reload";