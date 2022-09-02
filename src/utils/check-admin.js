const logger = require('../modules/logger')
const config = require('../utils/get-config');
const { MessageEmbed } = require('discord.js');

module.exports = (message, client) =>  {

    var syslog = new MessageEmbed({
        title: "権限がない人が管理コマンドを実行しました",
        description: "このメッセージはBot管理者でない人が評価しようとしたため送信します",
        fields: [{
                name: "ユーザーID",
                value: message.author.id
            },
        ]
    })

    var user_notification = new MessageEmbed({
        title: "権限がありません",
        description: "このコマンドを実行する権限がありません",
        fields: [                    {
                name: "実行に必要な権限",
                value: "Bot管理者"
            },
        ]
    })

    if (!config.bot.owner.includes(message.author.id)){
        message.channel.send({embeds: [user_notification]})
        // ログとして送信
        client.channels.cache.get(config.syslog).send({embeds: [syslog]})
        logger.warn("権限のない人が管理コマンドを実行しました")
        return "owner: no"
    } else {
        if (config.bot.owner.includes(message.author.id)){
            return "owner: yes"
        }
    }
}