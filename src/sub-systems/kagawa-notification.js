const { MessageEmbed} = require('discord.js');
const config = require('../utils/get-config')

module.exports = (client, message) => {

const today = new Date();
const dayOfweek = today.getDay()

if ( dayOfweek == 0 || dayOfweek == 6 ) {
    var embed =  new MessageEmbed({
        title: "香川チャレンジの時間です",
        color: 5301186,
        description: "Minecraft-v1.16.5を起動しましょう",
        fields: [
            {
                name: "本日の香川開始時間",
                value: "19:30"
            },
        ]
    })
} else {
    var embed =  new MessageEmbed({
        title: "香川チャレンジの時間です",
        color: 5301186,
        description: "Minecraft-v1.16.5を起動しましょう",
        fields: [
            {
                name: "本日の香川開始時間",
                value: "20:00"
            },
        ]
    })    
}

const mention = "<@&" + config.kagawa_notification.role + ">"
client.channels.cache.get(config.kagawa_notification.channel).send(mention)
client.channels.cache.get(config.kagawa_notification.channel).send({ embeds: [ embed ] })
}