const { EmbedBuilder } = require("discord.js");
const config = require("../utils/get-config.js");
const color = require("../utils/color-code.js");

module.exports = async (client, oldMember, newMember) => {
    // 表示名に変更がない場合は無視
    if (oldMember.displayName === newMember.displayName) return;

    const embed = new EmbedBuilder({
        title: "ニックネームが変更されました",
        description: "ユーザーのニックネーム更新情報を表示します",
        color: color.NOTIFY,
        fields: [
            {
                name: "対象ユーザー",
                value: `<@${newMember.id}> (ID: ${newMember.id})`
            },
            {
                name: "変更前",
                value: oldMember.displayName
            },
            {
                name: "変更後",
                value: newMember.displayName
            }
        ],
        timestamp: new Date()
    });
    client.channels.cache.get(config.syslog.channel).send({ embeds: [embed] });
};