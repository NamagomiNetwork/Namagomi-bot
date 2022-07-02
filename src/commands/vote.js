const logger = require('../modules/logger')

exports.run = (client, message, args) => {
        try{
            const [title, ...choices] = args
            if (!title) return message.channel.send({content: 'タイトルを指定してください'})
            const emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹']
        
        
            if (choices.length < 2 || choices.length > emojis.length)
                return message.channel.send({content: `選択肢は最低2つ最大20個の範囲内で指定してください`})
        
                async function sent() {
                    const poll = await message.channel.send({
                        embeds: [
                            {
                                title: title,
                                description: choices.map((c, i) => `${emojis[i]} ${c}`).join('\n')
                            }
                        ]
                    });
                    emojis.slice(0, choices.length).forEach(emoji => poll.react(emoji))
                }
                
                sent()
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

exports.name = "vote";