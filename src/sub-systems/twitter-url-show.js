const { MessageEmbed, MessageAttachment } = require("discord.js");

exports.x_twitter_com = (client, message) => {
    // X or TwitterのツイートURLがスポイラー(||)・不等号囲い(<>)されている時は埋め込み展開しない
    const spoilerTag = /\|\||</;
    if(message.content.match(spoilerTag)) return;

    const postURL = /https:\/\/(twitter\.com|x\.com)\/[A-Za-z0-9_]*\/status\/(\d+)/;
    const results = message.content.match(postURL);

    if (!results) return;

    let replaceURL = results[0].replace(/twitter.com|x.com/, "api.vxtwitter.com");

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
};
