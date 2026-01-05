const { ChannelType, EmbedBuilder, Client, Guild, TextChannel } = require("discord.js");
const ProfileModel = require("../utils/Schema/ProfileSchema");
const color = require("../utils/color-code");
const config = require("../utils/get-config");
const logger = require("../modules/logger");

/** 
 * 後でアーカイブするためにチャンネルを保存しておく。
 * @type {TextChannel[]} 
 * */
const birthday_channels = [];

module.exports = async (/** @type {Client} */ client) => {
    const now = new Date(
        new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })
    );

    const month = now.getMonth() + 1;
    const day = now.getDate();

    const birthdaysToday = await ProfileModel.find({
        birthday_month: month,
        birthday_day: day,
    });

    const guild = client.guilds.cache.get(config.guild);

    await archive_birthday_channel(client);

    for (const birthdayProfile of birthdaysToday) {
        const member = await guild.members.fetch(birthdayProfile._id);
        const channelName = member.displayName + "たん";

        const embed = new EmbedBuilder({
            title: "誕生日通知",
            color: color.CMD_RUN,
            description: `:tada:今日は <@${birthdayProfile._id}>の誕生日です:tada:`,
        });

        const channel = await open_birthday_channel(client, guild, channelName);

        if(!channel) {
            continue;
        }

        channel.send({ embeds: [embed] });
    };
}

/**
 * 誕生日チャンネルを作成する。
 * @param {Client} client
 * @param {Guild} guild
 * @param {string} channelName
 */
async function open_birthday_channel(client, guild, channelName) {
    try {
        const categoryId = config.birthday.channel_category;
        const roleId = config.birthday.human_role;
        const role = guild.roles.cache.get(roleId);

        const channel = await guild.channels.create({
            name: channelName,
            type: ChannelType.GuildText,
            parent: categoryId,
        });

        await channel.permissionOverwrites.edit(role, {
                ViewChannel: true,
                SendMessages: true,
            });

        birthday_channels.push(channel)

        return channel;
    } catch (err) {
        logger.error(err);
        return null;
    }
}

/**
 * 既にある誕生日チャンネルをArchive-birthdayに移動し、書き込み権限を削除する。
 * @param {Client} client
 */
async function archive_birthday_channel(client) {
    try {
        const archiveCategoryId = config.birthday.archive_category;

        const channels = await Promise.all(birthday_channels);
        for (const channel of channels) {
            if (!channel) {
                continue;
            }
            await channel.setParent(archiveCategoryId);
            await channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
                SendMessages: false,
            });
        }

        birthday_channels.length = 0;
    } catch (err) {
        logger.error(err)
    }
}

