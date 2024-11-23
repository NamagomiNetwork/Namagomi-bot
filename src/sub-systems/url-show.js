const { EmbedBuilder } = require("discord.js");
const config = require("../utils/get-config");

exports.discord_com = (client, message) => {
    const re = /https:\/\/discord\.com\/channels\/(\d{16,19})\/(\d{16,19})\/(\d{16,19})/;
    const results = message.content.match(re);
    if (!results) {
        return;
    }
    if (message.author.bot) {
        return;
    }

    // const guild_id = results[1]; 使ってないのでコメントアウト
    const channel_id = results[2];
    const message_id = results[3];

    const channelch = client.channels.cache.get(channel_id);
    if (!channelch) {
        return;
    }
    const isChannelIgnored = (channel) => {
        let id;
        if (channel.isThread()) {
            id = channel.parentId;
        } else {
            id = channel.id;
        }
        return config.url_show_ignore.channels.includes(id);
    };

    if (isChannelIgnored(channelch)) {
        return;
    }

    channelch.messages
        .fetch(message_id)
        .then((msg) => {
            let embeds = [];
            const msgpanel = new EmbedBuilder()
                .setDescription(msg.content || ' ')
                .setTimestamp(msg.createdAt)

                if (msg.author && msg.author.username) {
                    msgpanel.setAuthor({
                        name: msg.author.username,
                        iconURL: msg.author.avatarURL({ dynamic: true }) || ' ',
                    });
                }

                if (msg.guild && msg.channel) {
                    msgpanel.setFooter({
                        text: msg.channel.name || '不明なチャンネル',
                        iconURL:
                            msg.guild.iconURL() ||
                            'https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png',
                    });
                }
                embeds.push(msgpanel);
                if (msg.attachments.size > 0) {
                    msg.attachments.forEach((attachment) => {
                        
                        console.log(attachment);
                        embeds.push({
                            url: `${message.content}`,
                            image: {
                                url: attachment.url,
                            },
                        });
                    });
                }

            message.channel.send({ embeds: embeds });
/*
            if (msg.embeds[0]) {
                message.channel.send({ embeds: [msg.embeds[0]] });
            }
                */
        })
        .catch(console.error);
};

// TODO:discord_comとdiscord_ptb_comで中身が重複していて修正が面倒なので、discord_comに含める
exports.discord_ptb_com = (client, message) => {
    const re = /https:\/\/ptb\.discord\.com\/channels\/(\d{16,19})\/(\d{16,19})\/(\d{16,19})/;

    const results = message.content.match(re);
    if (!results) {
        return;
    }
    if (message.author.bot) {
        return;
    }
    // const guild_id = results[1]; 使ってないのでコメントアウト
    const channel_id = results[2];
    const message_id = results[3];

    const channelch = client.channels.cache.get(channel_id);
    if (!channelch) {
        return;
    }
    const isChannelIgnored = (channel) => {
        let id;
        if (channel.isThread()) {
            id = channel.parentId;
        } else {
            id = channel.id;
        }
        return config.url_show_ignore.channels.includes(id);
    };

    if (isChannelIgnored(channelch)) {
        return;
    }
    channelch.messages
        .fetch(message_id)
        .then((msg) => {
            const msgpanel = new EmbedBuilder()
                .setDescription(`${msg.content}`)
                .setAuthor({
                    name: `${msg.author.username}`,
                    iconURL: msg.author.avatarURL({ dynamic: true }),
                })
                .setTimestamp(msg.createdAt)
                .setFooter({
                    text: `${msg.channel.name}`,
                    iconURL: `${
                        msg.guild.iconURL() == null
                            ? "https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png"
                            : msg.guild.iconURL()
                    }`,
                });

            if (msg.attachments) {
                msgpanel.setImage(`${msg.attachments.map((attachment) => attachment.url)}`);
            }

            message.channel.send({ embeds: [msgpanel] });

            if (msg.embeds[0]) {
                message.channel.send({ embeds: [msg.embeds[0]] });
            }
        })
        .catch(console.error);
};
