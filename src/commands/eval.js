const logger = require('../modules/logger')
const config = require('../utils/get-config');
const notadmin = require('../utils/not-admin');
const { MessageEmbed } = require('discord.js');
exports.run = (client, message, args) => {
    var syslog = new MessageEmbed({
        title: "権限がない人がコマンドを実行しようとしました",
        description: "このメッセージはBotownerでない人が実行しようとしたため送信します",
        fields: [{
                name: "ユーザーID",
                value: message.author.id
            },
        ]
    })

    if(!config.command_settings.eval.includes("true")){
        return;
    }

    if (!config.owner.includes(message.author.id)){
        message.channel.send({embeds: [notadmin.embed]})
        // ログとして送信
        client.channels.cache.get(config.syslog).send({embeds: [syslog]})
        logger.warn("権限のない人が管理コマンドを実行しました")
        return;
    }

    const clean = async (text) => {
        // If our input is a promise, await it before continuing
        if (text && text.constructor.name == "Promise")
          text = await text;
        
        // If the response isn't a string, `util.inspect()`
        // is used to 'stringify' the code in a safe way that
        // won't error out on objects with circular references
        // (like Collections, for example)
        if (typeof text !== "string")
          text = require("util").inspect(text, { depth: 1 });
        
          // TOKENを表示できないように
          const token_base64 = Buffer.from(config.token).toString('base64');
          text = text.replaceAll(config.token, "[検閲済み]");
          text = text.replaceAll(token_base64, "[検閲済み]");

        // Replace symbols with character code alternatives
        text = text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
        
        // Send off the cleaned up result
        return text;
        }

async function run(){
  // Get our input arguments
    const args = message.content.split(" ").slice(1);


    // In case something fails, we to catch errors
    // in a try/catch block
    try {
      // Evaluate (execute) our input
      const evaled = eval(args.join(" "));
    
      var err_argument = new MessageEmbed({
        title: "コードの評価",
        description: "ERROR: 評価するコードが入力されていません",
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

    if(!evaled){
        message.reply({ embeds: [err_argument]})
        return;
    }

      // Put our eval result through the function
      // we defined above
      const cleaned = await clean(evaled);

      
    // 埋め込み: 成功時
    var code = new MessageEmbed({
        title: "コードの評価",
        description: "コードを評価しました",
        color: 3853014,
        fields: [
            {
                name: "入力",
                value: "```\n"+ args + "\n```"
            },
            {
                name: "出力",
                value: "```\n"+ cleaned + "\n```"
            }
        ]
    })

    // 出力値が500文字,入力値が350文字を超えた場合処理を中断する
    const output = cleaned.length
    const input = args.length

    if(output >=500){
        var err_output_long = new MessageEmbed({
            title: "コードの評価",
            description: "ERROR: 実行結果が500文字を超えたため表示しません...",
            color: 16601703,
            fields: [
                {
                    name: "入力",
                    // この時点ではinputが350文字を超える可能性があるため
                    value: "```\n"+ "N/A(非表示)" + "\n```"
                },
                {
                    name: "出力",
                    value: "```sh\n"+ "実行結果が500文字以上でした..." + "\n```"
                }
            ]
        })
        message.reply({ embeds: [err_output_long]})
        logger.warn("コードの評価の出力値が500字を超えたため処理を中断しました")
    }

    if(input >=350){
        var err_input_long = new MessageEmbed({
            title: "コードの評価",
            description: "ERROR: 入力値が350文字を超えたため表示しません...",
            color: 16601703,
            fields: [
                {
                    name: "入力",
                    // この時点ではinputが400文字を超える可能性があるため
                    value: "```\n"+ "入力値が350文字以上でした..." + "\n```"
                },
                {
                    name: "出力",
                    value: "```sh\n"+ "N/A" + "\n```"
                }
            ]
        })
        message.reply({ embeds: [err_input_long]})
        logger.warn("コードの評価の入力値が350字を超えたため処理を中断しました")
    }

      // Reply in the channel with our result
      //message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``);
      message.channel.send(({embeds: [code]}))
    } catch (err) {
      // エラーが起きた場合エラー文を送信する
    
    try{
    var error_msg = new MessageEmbed({
        title: "コードの評価",
        color: 16601703,
        description: "コードを評価しました",
        fields: [
            {
                name: "入力値",
                value: "```\n"+ args + "\n```"
            },
            {
                name: "出力",
                value: "```\n"+ err + "\n```"
            }
        ]
    })

    logger.error("eval実行エラーが発生しました")
    logger.error(err)
    message.channel.send(({embeds: [error_msg]}))
    } catch(send_error){
        logger.error("Discordへのメッセージ送信に失敗しました...")
        logger.error(send_error)
    }
}
}

run()
  };

exports.name = "eval";