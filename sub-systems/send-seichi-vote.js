const { MessageEmbed} = require('discord.js');

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
exports.embed = embed