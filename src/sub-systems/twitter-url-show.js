const { MessageEmbed } = require("discord.js");

exports.x_twitter_com = (client, message) => {
    const regex = /https:\/\/(twitter\.com|x\.com)\/[A-Za-z0-9]*\/status\/\d+\//;
    const results = message.content.match(regex);

    if (!results) return;
    if (message.author.bot) return;

    console.log(results);
};
