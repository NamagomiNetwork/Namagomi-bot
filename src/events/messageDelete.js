const { EmbedBuilder } = require("discord.js");
const config = require("../utils/get-config"); 
const color = require("../utils/color-code");

module.exports = async (client, message) => { 
    const embed = new EmbedBuilder({
        title: "メッセージが削除されました",
        description: "削除されたメッセージのデータを表示します",
        color: color.NOTIFY,
        fields: [
            {
                name: "送信時間",
                value: message.createdAt.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
            },
            {
                name: "チャンネル",
                value: `<#${message.channelId}>`
            },
                        {
                name: "送信者",
                value: `<@${message.author.id}> (ID: ${message.author.id})`
            },
            {
                name: "内容",
                value: message.content
            }
        ],
        timestamp: new Date()
    });
    client.channels.cache.get(config.syslog.channel).send({ embeds: [embed] });
};