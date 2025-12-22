const sendErrorMessage = require("../modules/error-message");

exports.run = (client, message, args) => {
    const [title, ...choices] = args;
    const emojis = [
        "🇦",
        "🇧",
        "🇨",
        "🇩",
        "🇪",
        "🇫",
        "🇬",
        "🇭",
        "🇮",
        "🇯",
        "🇰",
        "🇱",
        "🇲",
        "🇳",
        "🇴",
        "🇵",
        "🇶",
        "🇷",
        "🇸",
        "🇹",
    ];
    async function sent() {
        const poll = await message.channel.send({
            embeds: [
                {
                    title: title,
                    description: choices.map((c, i) => `${emojis[i]} ${c}`).join("\n"),
                },
            ],
        });
        emojis.slice(0, choices.length).forEach((emoji) => poll.react(emoji));
    }
    try {
        if (!title) return message.channel.send({ content: "タイトルを指定してください" });

        if (choices.length < 2 || choices.length > emojis.length)
            return message.channel.send({ content: `選択肢は最低2つ最大20個の範囲内で指定してください` });

        sent();
    } catch (err) {
        sendErrorMessage(err, message);
    }
};

exports.name = "vote";
