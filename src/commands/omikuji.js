const logger = require('../modules/logger')
const err_embed = require('../utils/error-embed')

exports.run = (client, message, args) => {
    try{

        
        function bukkubukku(){
        let arr = ["ﾌﾞｯｸﾌﾞｯｸ", "本が溺れた。ﾌﾞｯｸﾌﾞｯｸｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗ"];
        var random = Math.floor(Math.random() * arr.length);
        var result = arr[random];
        message.channel.send({content: result});
        }
        //ごみ
        function namagomi(){
        let arr = ["生ゴミ", "黙れゴミ"];
        var random = Math.floor(Math.random() * arr.length);
        var result = arr[random];
        message.channel.send({content: result});
        }
        
        if(message.author.id.includes("538308521985572867")){
            namagomi()
            return;
        }
        
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
