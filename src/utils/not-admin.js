const { MessageEmbed } = require('discord.js');

var embed = new MessageEmbed({
    title: "権限がありません",
    description: "このコマンドを実行する権限がありません",
    fields: [                    {
            name: "実行に必要な権限",
            value: "Bot管理者"
        },
    ]
})

exports.embed = embed