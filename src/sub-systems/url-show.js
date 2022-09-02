const { MessageEmbed} = require('discord.js');
const config = require('../utils/get-config')

exports.discord_com = (client, message) => {

    const re = /https:\/\/discord\.com\/channels\/(\d{16,19})\/(\d{16,19})\/(\d{16,19})/
    const results = message.content.match(re)
    if (!results) {
      return
    };
    if (message.author.bot) {
      return;
    }
    const guild_id = results[1]
    const channel_id = results[2]
    const message_id = results[3]
  
    const channelch = client.channels.cache.get(channel_id);
    if (!channelch) {
      return;
    }
  
    channelch.messages.fetch(message_id)
      .then(msg => {
        const msgpanel = new MessageEmbed()
        .setDescription(`${msg.content}`)
        .setAuthor({name: `${msg.author.username}`, iconURL: msg.author.avatarURL({ dynamic:true })})
        .setTimestamp(msg.createdAt)
        .setFooter({text: `${msg.channel.name}`, iconURL: `${msg.guild.iconURL() == null ? "https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png" : msg.guild.iconURL()}`})
  
        if (msg.attachments) {
            msgpanel.setImage(`${msg.attachments.map(attachment => attachment.url)}`)
        } else {
            ;
        }
  
        message.channel.send({ embeds: [msgpanel] })
  
        if (msg.embeds[0]) {
            message.channel.send({ embeds: [msg.embeds[0]] });
        } else {
            ;
        }
    })
    .catch(console.error);
}

exports.discord_ptb_com = (client, message) => {

    const re = /https:\/\/ptb.discord\.com\/channels\/(\d{16,19})\/(\d{16,19})\/(\d{16,19})/
    const results = message.content.match(re)
    if (!results) {
      return
    };
    if (message.author.bot) {
      return;
    }
    const guild_id = results[1]
    const channel_id = results[2]
    const message_id = results[3]
  
    const channelch = client.channels.cache.get(channel_id);
    if (!channelch) {
      return;
    }
  
    channelch.messages.fetch(message_id)
      .then(msg => {
        const msgpanel = new MessageEmbed()
        .setDescription(`${msg.content}`)
        .setAuthor({name: `${msg.author.username}`, iconURL: msg.author.avatarURL({ dynamic:true })})
        .setTimestamp(msg.createdAt)
        .setFooter({text: `${msg.channel.name}`, iconURL: `${msg.guild.iconURL() == null ? "https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png" : msg.guild.iconURL()}`})
  
        if (msg.attachments) {
            msgpanel.setImage(`${msg.attachments.map(attachment => attachment.url)}`)
        } else {
            ;
        }
  
        message.channel.send({ embeds: [msgpanel] })
  
        if (msg.embeds[0]) {
            message.channel.send({ embeds: [msg.embeds[0]] });
        } else {
            ;
        }
    })
    .catch(console.error);
}