const { MessageEmbed, MessageAttachment } = require("discord.js");

exports.x_twitter_com = (client, message) => {
    const mentionPostRegex = /[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠]*/;
    const mentionPostResult = message.content.match(mentionPostRegex);
    console.log(mentionPostResult[0]);
    if (mentionPostResult[0]) return;

    const urlRegex = /https:\/\/(twitter\.com|x\.com)\/[A-Za-z0-9_]*\/status\/(\d+)/;
    const urlRegexResults = message.content.match(urlRegex);
    if (!urlRegexResults) return;

    let replaceURL = urlRegexResults[0].replace(/twitter.com|x.com/, "api.vxtwitter.com");

    fetch(replaceURL)
        .then((res) => res.json())
        .then((post) => {
            let embeds = [];
            let attachment;
            const embed = new MessageEmbed({
                author: {
                    name: `${post.user_name} ` + `(@` + `${post.user_screen_name}` + `)`,
                },
                description: post.text + `\n\n[WEBで表示する](` + post.tweetURL + `)`,
                url: post.tweetURL,
                timestamp: post.date,
                footer: {
                    text: `${post.user_screen_name}`,
                    iconURL: `https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png`,
                },
            });
            embeds.push(embed);

            if (post.mediaURLs.length === 0) {
                message.channel.send({ embeds: [embed] });
                return;
            } else if (post.mediaURLs.length >= 1) {
                post.mediaURLs.forEach((mediaElment) => {
                    if (mediaElment.includes("video.twimg.com")) {
                        attachment = mediaElment;
                        return;
                    }
                    embeds.push({
                        url: `${post.tweetURL}`,
                        image: {
                            url: mediaElment,
                        },
                    });
                });

                if (attachment === undefined) {
                    message.channel.send({ embeds: embeds });
                } else {
                    message.channel.send({ embeds: embeds, files: [new MessageAttachment(attachment)] });
                }
            }
        });
    const delayMS = 100;
    setTimeout(() => {
        message.delete();
    }, delayMS);
};
