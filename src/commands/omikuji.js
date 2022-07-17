const logger = require('../modules/logger')
const err_embed = require('../utils/error-embed')

exports.run = (client, message, args) => {
    try{
        let arr = ["大吉", "中吉", "小吉", "吉", "凶", "大凶", "ﾌﾞｯｸﾌﾞｯｸ"];
        var random = Math.floor(Math.random() * arr.length);
        var result = arr[random];
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

exports.name = "omikuji";