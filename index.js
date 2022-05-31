console.log(require('discord.js').version)
require("dotenv").config();
const { Client, Intents, MessageEmbed, Permissions, MessageActionRow,  MessageButton, } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES] });
// const fs = require('fs');

const prefix = 'g!'
// let connections = {};
// let speak_chs = {};

LOG_CHANNEL_ID = '937190204693958706'

client.on('ready', () => {
    //This will get the amount of servers and then return it.
    const servers = client.guilds.cache.size
    // const users = client.users.cache.size
    
    console.log(`Botは今 ${servers} 個のサーバーに入ってるよー`)

    client.user.setActivity(`ぶおおお`, {
        type: 'PLAYING',
    })
})
client.on('messageCreate', async message => {

    async function sendError(err) {
        const err_embed = new MessageEmbed({
            description: '```\n' + err.toString() + '\n```',
            footer:{
                text: `サーバー: ${message.guild.id} | ${message.content}`
            }
        })
        const ch = await client.channels.fetch(LOG_CHANNEL_ID)
        if (ch) {
            ch.send({embeds: [err_embed]})
        }
    }

    if (message.author.bot) {
        return;
    }

    if (message.content.indexOf(prefix) !== 0) return;
    const [command, ...args] = message.content.slice(prefix.length).split(' ')

    switch (command) {
	case 'help':
            var embed = new MessageEmbed({
                title: "helpです",
                description: "This is Help commands",
                color: 0xffff12,
                fields: [                    {
                        name: "g!help",
                        value: "これです(てきとう)"
                    },
                    {
                        name: "g!user [メンションもしくはID]",
                        value: "ユーザー情報を出せます"
                    },
                    {
                        name: "g!vote [タイトル] [投票1] [投票2] ● ● ●",
                        value: "投票ができます"
                    },
                    {
                        name: "g!omikuji",
                        value: "おみくじ"
                    },
                ]
            })
            message.channel.send({embeds: [embed]})
        break;

        case 'omikuji':
            let arr = ["大吉", "中吉", "小吉", "吉", "凶", "大凶", "ぶおおお", "ぶおおおおおおお"];
            var random = Math.floor(Math.random() * arr.length);
            var result = arr[random];
            message.reply({content: result});
        break;

//アンケート機能
        case 'vote':
            const [title, ...choices] = args
            if (!title) return message.channel.send({content: 'タイトルを指定してください'})
            const emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹']

            if (choices.length < 2 || choices.length > emojis.length)
              return message.channel.send({content: `選択肢は2から${emojis.length}つを指定してください`})
            const poll = await message.channel.send({
                embeds: [
                    {
                        title: title,
                        description: choices.map((c, i) => `${emojis[i]} ${c}`).join('\n')
                    }
                ]
            });
            emojis.slice(0, choices.length).forEach(emoji => poll.react(emoji))
        break;
        case 'user':
            let user_id = (message.mentions.members.size > 0) ? message.mentions.members.first().id : args[0];
            if (!user_id) return message.channel.send({ content: "エラー: IDが入力されていません" });

            const member = message.guild.members.cache.get(user_id);
            if (!member) return message.channel.send({ content: "エラー: 指定されたIDが見つかりません" })

            const presence_data = {"online": "オンライン", "offline": "オフライン", "dnd": "取り込み中", "idle": "退席中"}
            message.channel.send({
                embeds:[
                    {
                        title: `───${member.user?.username}の情報───`,
                        description: `${member.user?.username}の情報を表示しています`,
                        color: "RANDOM", //色
                        timestamp: new Date(),
                        footer: {
                            icon_url: message.guild.iconURL(),
                            text: `サーバー名：${message.guild.name}`
                        },
                        thumbnail: {
                            url: member.user.avatarURL()
                        },
                        fields: [
                            {
                                name: "ユーザータグ",
                                value: `${member.user.tag}`
                            },
                            {
                                name: "ユーザーメンション",
                                value: `${member}`
                            },
                            {
                                name: "ユーザーID",
                                value: `${member.id}`
                            },
                            {
                                name: "アカウントの種類",
                                value: member.bot ? "BOT" : "ユーザー",
                                inline: true
                            },
                            {
                                name: "現在のステータス",
                                value: `${presence_data[member.presence?.status]}`,
                                inline: true
                            },
                            {
                                name: "userguild",
                                value: `${member.guild}`
                            }
                        ]
                    }
                ]
                
            });
        break;
    }
})


//メッセージURL展開======================================
client.on('messageCreate', async message => {
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
});

client.on('messageCreate', async message => {
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
});
client.on('messageCreate', async message => {
  const re = /https:\/\/canary.discord\.com\/channels\/(\d{16,19})\/(\d{16,19})\/(\d{16,19})/
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
});

client.login(process.env.DISCORD_TOKEN).catch(err => console.warn(err));