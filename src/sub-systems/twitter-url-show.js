const { MessageEmbed, Message, MessageAttachment } = require("discord.js");

exports.x_twitter_com = (client, message) => {
    const regex = /https:\/\/(twitter\.com|x\.com)\/[A-Za-z0-9_]*\/status\/(\d+)/;
    const results = message.content.match(regex);

    if (!results) return;

    let replaceURL = results[0].replace(/twitter.com|x.com/, "api.vxtwitter.com");
    console.log(results[0]);

    fetch(replaceURL)
        .then((res) => res.json())
        .then((post) => {
            let embeds = [];
            let attachment;
            const embed = new MessageEmbed({
                author: {
                    name: `${post.user_name} ` + `(@` + `${post.user_screen_name}` + `)`,
                },
                description: post.text + `\n\n[Xで表示する](` + post.tweetURL + `)`,
                url: post.tweetURL,
                timestamp: post.date,
                footer: {
                    text: `${post.user_screen_name}`,
                    iconURL: `https://www.freepnglogos.com/uploads/twitter-x-logo-png/twitter-x-logo-png-9.png`,
                },
            });
            embeds.push(embed);

            if (post.mediaURLs) {
                post.mediaURLs.forEach((mediaElment) => {
                    if (mediaElment.includes("video.twimg.com")) {
                        attachment = mediaElment;
                        console.log(mediaElment);
                        console.log(attachment);
                        return;
                    }
                    if (post.mediaURLs.length > 1) {
                        embeds.push({
                            url: `${post.tweetURL}`,
                            image: {
                                url: mediaElment,
                            },
                        });
                    }
                });
            }
            console.log(embeds);
            message.channel.send({ embeds: embeds, files: [new MessageAttachment(attachment)] });
        });
};
