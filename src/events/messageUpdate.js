const { EmbedBuilder } = require("discord.js");
const config = require("../utils/get-config");
const color = require("../utils/color-code");

module.exports = async (client, oldMessage, newMessage) => {
    // botのメッセージは無視する
    if (oldMessage.author.bot) return;
    // 部分的に取得されたメッセージは無視する
    if (oldMessage.partial || newMessage.partial) return;

    // 内容に変更がない場合は無視する
    if (oldMessage.content === newMessage.content) return;
    const oldContent = oldMessage.content || '（変更集前の内容なし）';
    const newContent = newMessage.content || '（変更後の内容なし）';

    const embed = new EmbedBuilder({
        title: "メッセージが更新されました",
        description: "更新されたメッセージのデータを表示します",
        color: color.NOTIFY,
        fields: [
            {
                name: "送信時間",
                value: oldMessage.createdAt.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
            },
            {
                name: "チャンネル",
                value: `<#${oldMessage.channelId}>`
            },
            {
                name: "送信者",
                value: `<@${oldMessage.author.id}> (ID: ${oldMessage.author.id})`
            },
            {
                name: "変更前の内容",
                value: oldContent
            },
            {
                name: "変更後の内容",
                value: newContent
            },
            {
                name: "メッセージリンク",
                value: newMessage.url
            },
        ],
        timestamp: new Date()
    });
    client.channels.cache.get(config.syslog.channel).send({ embeds: [embed] });
};