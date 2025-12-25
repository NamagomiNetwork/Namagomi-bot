const color = require("../utils/color-code");
const sendErrorMessage = require("../modules/error-message");

exports.run = (client, message, args) => {
    try {
        let user_id = message.mentions.members.size > 0 ? message.mentions.members.first().id : args[0];
        if (!user_id) return message.channel.send({ content: "エラー: IDが入力されていません" });

        const member = message.guild.members.cache.get(user_id);
        if (!member) return message.channel.send({ content: "エラー: 指定されたIDが見つかりません" });

        const presence_data = { online: "オンライン", offline: "オフライン", dnd: "取り込み中", idle: "退席中" };
        message.channel.send({
            embeds: [
                {
                    title: `───${member.user?.username}の情報───`,
                    description: `${member.user?.username}の情報を表示しています`,
                    color: color.NOTIFY,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.guild.iconURL(),
                        text: `サーバー名：${message.guild.name}`,
                    },
                    thumbnail: {
                        url: member.user.avatarURL(),
                    },
                    fields: [
                        {
                            name: "ユーザータグ",
                            value: `${member.user.tag}`,
                        },
                        {
                            name: "ユーザーメンション",
                            value: `${member}`,
                        },
                        {
                            name: "ユーザーID",
                            value: `${member.id}`,
                        },
                        {
                            name: "アカウントの種類",
                            value: member.bot ? "BOT" : "ユーザー",
                            inline: true,
                        },
                        {
                            name: "現在のステータス",
                            value: `${presence_data[member.presence?.status]}`,
                            inline: true,
                        },
                        {
                            name: "userguild",
                            value: `${member.guild}`,
                        },
                    ],
                },
            ],
        });
    } catch (err) {
        sendErrorMessage(err, message);
    }
};

exports.name = "user";
