const logger = require('../modules/logger')
const config = require('../utils/get-config');
const check_admin = require('../utils/check-admin')
const { MessageEmbed } = require('discord.js');
const err_embed = require('../utils/error-embed')
var seichi_vote = require('../sub-systems/seichi-vote')
const seichi_achievement_embeds = require('../sub-systems/seichi-achievement/embed')
const profileModel = require('../utils/Schema/ProfileSchema');
const BlockUserModel = require('../utils/Schema/BlockUserSchema');
const TawasiModel = require('../utils/Schema/TawasiSchema');

exports.run = (client, message, args) => {
    var permission_check = check_admin(message, client)

    if (permission_check == ('owner: no')){
        return;
    }

    var err_not_args = new MessageEmbed({
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

    if(args.length == 0){
        message.channel.send({ embeds: [err_not_args]})
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
        text = text.replaceAll(config.mongodb.url, "****");
        // Replace symbols with character code alternatives
        text = text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
        text = text.replaceAll(config.bot.token, "****");
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

    // 入力値規制
    if(args.length >=1000){
        var err_input_long = new MessageEmbed({
            title: "コードの評価",
            description: "ERROR: 入力値が1000文字を超えたため表示しません...",
            color: 16601703,
            fields: [
                {
                    name: "入力",
                    value: "```\n"+ "入力値が1000文字以上でした..." + "\n```"
                },
                {
                    name: "出力",
                    value: "```sh\n"+ "N/A" + "\n```"
                }
            ]
        })
        message.channel.send({ embeds: [err_input_long]})
        logger.warn("入力値が1000字を超えたため処理を中断しました")
        return;
    }

      var err_not_output = new MessageEmbed({
        title: "コードの評価",
        description: "出力がありませんでしたが、コードの実行には成功しました",
        color: 3853014,
        fields: [
            {
                name: "入力",
                value: "```\n"+ args + "\n```"
            },
            {
                name: "出力",
                value: "```\n"+ "N/A" + "\n```"
            }
        ]
    })

    const cleaned = await clean(evaled);

    if(!evaled){
        message.channel.send({ embeds: [err_not_output]})
        return;
    }

    // ページを作成したり分割したり
    const output_1 = cleaned.slice(0, 1000)
    const output_2 = cleaned.slice(1000, 2000)
    const output_3 = cleaned.slice(3000, 4000)
    const output_4 = cleaned.slice(4000, 5000)
    const output_5 = cleaned.slice(5000, 6000)
    var page1 = new MessageEmbed({
        title: "コードの評価",
        description: "コードを評価しました (1ページ目)",
        color: 3853014,
        fields: [
            {
                name: "入力",
                value: "```\n"+ args + "\n```"
            },
            {
                name: "出力",
                value: "```sh\n"+ output_1 + "\n```"
            }
        ]
    })
    var page2 = new MessageEmbed({
        title: "コードの評価",
        description: "コードを評価しました (2ページ目)",
        color: 3853014,
        fields: [
            {
                name: "2ページ目",
                value: "```sh\n"+ output_2 + "\n```"
            }
        ]
    })
    var page3 = new MessageEmbed({
        title: "コードの評価",
        description: "コードを評価しました (3ページ目)",
        color: 3853014,
        fields: [
            {
                name: "3ページ目",
                value: "```sh\n"+ output_3 + "\n```"
            }
        ]
    })
    var page4 = new MessageEmbed({
        title: "コードの評価",
        description: "コードを評価しました (4ページ目)",
        color: 3853014,
        fields: [
            {
                name: "4ページ目",
                value: "```sh\n"+ output_4 + "\n```"
            }
        ]
    })
    var page5 = new MessageEmbed({
        title: "コードの評価",
        description: "コードを評価しました (最終ページ)",
        color: 3853014,
        fields: [
            {
                name: "5ページ目",
                value: "```sh\n"+ output_5 + "\n```"
            }
        ]
    })

    // メッセージ送信
    message.channel.send({ embeds: [page1]})
        if(output_2.length >=1){
            message.channel.send({ embeds: [page2]})
        }
        if(output_3.length >=1){
            message.channel.send({ embeds: [page3]})
        }
        if(output_4.length >=1){
            message.channel.send({ embeds: [page4]})
        }
        if(output_5.length >=1){
            message.channel.send({ embeds: [page5]})
        }
    } catch (err) {
            logger.error("コマンド評価エラーが発生しました")
            logger.error(err)
            message.channel.send(({embeds: [err_embed.main]}))
            if(config.debug.enable.includes("true")){
                message.channel.send(({embeds: [err_embed.debug]}))
                message.channel.send("エラー内容: ")
                message.channel.send("```\n"+ err + "\n```")
            }
    }
}

// じっこう
run()
};

exports.name = "eval";