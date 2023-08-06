const { MessageEmbed} = require('discord.js');
const config = require('../utils/get-config')

module.exports = (client, message) => {

var embed =  new MessageEmbed({
    title: "投票の時間です",
    color: 5301186,
    description: "投票しましょう",
    fields: [
        {
            name: "JMS",
            value: "https://minecraft.jp/servers/play.seichi.click/vote"
        },
        {
            name: "monocraft",
            value: "https://monocraft.net/servers/Cf3BffNIRMERDNbAfWQm/vote"
        },
    ]
})
const mention = "<@&" + config.seichi_vote_notification.role + ">"
client.channels.cache.get(config.seichi_vote_notification.channel).send(mention)
client.channels.cache.get(config.seichi_vote_notification.channel).send({ embeds: [ embed ] })
}