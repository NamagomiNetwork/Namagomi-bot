const { EmbedBuilder } = require("discord.js");
const config = require("../utils/get-config"); 
const color = require("../utils/color-code");

module.exports = async (client, member) => {
        const embed = new EmbedBuilder({
            title: "ユーザーが退室しました",
            description: "退室したユーザーの情報を表示します",
            color: color.NOTIFY,
            fields: [
                {
                    name: "退室者",
                    value: `<@${member.id}> (ID: ${member.id})`
                }
            ],
            timestamp: new Date()
        });
         client.channels.cache.get(config.syslog.channel).send({ embeds: [embed] });
    };