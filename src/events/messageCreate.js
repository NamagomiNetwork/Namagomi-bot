const config = require('../../get-config');
const { MessageEmbed } = require('discord.js');
const logger = require('../modules/logger')
logger.debug("Load message Create Event")
module.exports = (client, message) => {
    // Ignore bots
    if (message.author.bot) return;
    
    async function discord_com(){
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
      
            message.reply({ embeds: [msgpanel] })
      
            if (msg.embeds[0]) {
                message.channel.send({ embeds: [msg.embeds[0]] });
            } else {
                ;
            }
        })
            .catch(console.error);
    }

    async function ptb_discord_com(){
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
      
            message.reply({ embeds: [msgpanel] })
      
            if (msg.embeds[0]) {
                message.channel.send({ embeds: [msg.embeds[0]] });
            } else {
                ;
            }
        })
            .catch(console.error);
    }


  try{
      ptb_discord_com()
      discord_com()
  } catch (err) {
      // メッセージが送れない可能性を考慮(送れなくてbotが落ちるってのを防ぐ)
    try{
    var error_msg = new MessageEmbed({
        title: "コマンドの実行に失敗しました...",
        color: 16601703,
        fields: [
            {
                name: "エラー内容",
                value: "```\n"+ err + "\n```"
            }
        ]
    })
  
    logger.error("コマンド実行エラーが発生しました")
    logger.error(err)
    message.channel.send(({embeds: [error_msg]}))
    } catch(send_error){
        logger.error("Discordへのメッセージ送信に失敗しました...")
        logger.error(send_error)
    }
  }
    
    // Ignore messages not starting with the prefix
    if (message.content.indexOf(config.prefix) !== 0) return;
  
    // Our standard argument/command name definition.
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;
  
    // Run the command
    cmd.run(client, message, args);
  };