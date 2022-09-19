const logger = require('../modules/logger')
const err_embed = require('../utils/error-embed')

exports.run = (client, message, args) => {
        try{
            const [count, ...choices] = args
            if (!count) 
                return message.channel.send({content: '試行回数を指定してください'})
            if (choices.length < 2 || title > choices.length)
                return message.channel.send({content: `選択肢は最低2つ以上,試行回数の選択肢以下で指定してください`})

            //一回目
            var random = Math.floor(Math.random() * choices.length)
            var result = count[random]
            choices.splice(random,1)
            
            //二回目以降
            for (let i=1; i < count; i++){
                var random = Math.floor(Math.random() * choices.length)
                var result = result + "," + choices[random]
                choices.splice(random,1)
            }

            message.channel.send({content: result});
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

exports.name = "random"