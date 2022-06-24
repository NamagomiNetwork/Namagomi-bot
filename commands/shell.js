const logger = require('../modules/logger')
const config = require('../get-config.js');
const notadmin = require('../utils/not-admin');
const { MessageEmbed } = require('discord.js');
const util = require('util');
const child = require('child_process')

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
        
        if(!config.command_settings.shell.includes("true")){
            return;
        }

        if (!config.owner.includes(message.author.id)){
            message.channel.send({embeds: [notadmin.embed]})
            // ログとして送信
            client.channels.cache.get(config.syslog).send({embeds: [syslog]})
            logger.warn("権限のない人が管理コマンドを実行しました")
            return;
        }
    
        const command = args.join(" ");
        
        var err_argument = new MessageEmbed({
            title: "シェルコマンド実行",
            description: "ERROR: 引数が指定されていません",
            color: 16601703,
            fields: [
                {
                    name: "入力",
                    value: "```\n"+ "N/A" + "\n```"
                },
                {
                    name: "出力",
                    value: "```\n"+ "N/A" + "\n```"
                }
            ]
        })
    
        if(!command){
            message.reply({ embeds: [err_argument]})
            return;
        }
    
        child.exec(command, (err, res) => {
                    // 1024字文字以上メッセージを送信するとエラーがおきるので文字数制御を行う

            const input = command
            const input_count = input.length
            if(input_count >=300){
                var err_input_long = new MessageEmbed({
                    title: "シェルコマンド実行",
                    description: "ERROR: 入力値が300文字を超えました...",
                    color: 16601703,
                    fields: [
                        {
                            name: "入力",
                            value: "```\n"+ "ながいよぉ！" + "\n```"
                        },
                        {
                            name: "出力",
                            value: "```sh\n"+ "N/A" + "\n```"
                        }
                    ]
                })
            message.reply({ embeds: [err_input_long]})
            logger.warn("シェルコマンド入力値が300文字を超えたため処理を中断しました...")
            return;
        }

            const output = res.slice(0, 2000)
            const output_count = output.length
            if(output_count >=800){
                var err_output_long = new MessageEmbed({
                    title: "シェルコマンド実行",
                    description: "ERROR: 実行結果が800文字を超えたため表示しません...",
                    color: 16601703,
                    fields: [
                        {
                            name: "入力",
                            value: "```\n"+ command + "\n```"
                        },
                        {
                            name: "出力",
                            value: "```sh\n"+ "実行結果が800文字以上でした..." + "\n```"
                        }
                    ]
                })
            message.reply({ embeds: [err_output_long]})
            logger.warn("シェルコマンド実行結果が800文字を超えたため処理を中断しました")
            return;
            }
            if(err){
                var err_shell = new MessageEmbed({
                    title: "シェルコマンド実行",
                    description: "シェルコマンドを実行しました",
                    color: 16601703,
                    fields: [
                        {
                            name: "入力",
                            value: "```\n"+ command + "\n```"
                        },
                        {
                            name: "出力",
                            value: "```\n"+ err + "\n```"
                        }
                    ]
                })
                message.reply({ embeds: [err_shell]})
                logger.error("シェルコマンド実行中にエラーが発生しました...")
                logger.error(err)
                return;
            }
        
            // 実行成功時
            var success = new MessageEmbed({
                title: "シェルコマンド実行",
                description: "シェルコマンドを実行しました",
                color: 3853014,
                fields: [
                    {
                        name: "入力",
                        value: "```\n"+ command + "\n```"
                    },
                    {
                        name: "出力",
                        value: "```sh\n"+ output + "\n```"
                    }
                ]
            })
    
            message.reply({ embeds: [success]})
        })
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

exports.name = "shell";