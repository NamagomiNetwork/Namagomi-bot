const { MessageEmbed } = require("discord.js");

exports.x_twitter_com = (client, message) => {
    const regex = /https:\/\/(twitter\.com|x\.com)\/[A-Za-z0-9_]*\/status\/(\d+)/;
    const results = message.content.match(regex);

    if (!results) return;

    let replaceURL = results[0].replace(/twitter.com|x.com/, "api.vxtwitter.com");
    console.log(results[0]);

    fetch(replaceURL)
        .then((res) => res.json())
        .then((post) => {
            const msgpanel = new MessageEmbed()
                .setDescription(`${post.text}`)
                .setAuthor({
                    name: `${post.user_name}` + `(@` + `${post.user_screen_name}` + `)`,
                })
                .setURL(post.tweetURL)
                .setDescription(post.text + `\n\n[Xで表示する](` + post.tweetURL + `)`)
                .setTimestamp(post.date)
                .setFooter({
                    text: `${post.user_screen_name}`,
                    iconURL: `https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png`,
                });
            if (post.media_extend) {
                msgpanel.setImage(`${post.mediaURLs.map((media_extend) => media_extend.thumbnail_url)}`);
            }
            message.channel.send({ embeds: [msgpanel] });
        });
};
