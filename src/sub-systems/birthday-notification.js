const { ChannelType, EmbedBuilder, Client, Guild, TextChannel } = require("discord.js");
const ProfileModel = require("../utils/Schema/ProfileSchema");
const BirthdayChannelModel = require("../utils/Schema/BirthdayChannelSchema");
const color = require("../utils/color-code");
const config = require("../utils/get-config");
const logger = require("../modules/logger");

module.exports = async (/** @type {Client} */ client) => {
    const now = new Date(new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }));

    const month = now.getMonth() + 1;
    const day = now.getDate();

    const birthdaysToday = await ProfileModel.find({
        birthday_month: month,
        birthday_day: day,
        birthday_flag: true,
    });

    const guild = client.guilds.cache.get(config.guild);

    await archive_birthday_channel(client, guild);

    for (const birthdayProfile of birthdaysToday) {
        const member = await guild.members.fetch(birthdayProfile._id);
        const channelName = member.displayName + "たん";

        const embed = new EmbedBuilder({
            title: "誕生日通知",
            color: color.CMD_RUN,
            description: `:tada:今日は <@${birthdayProfile._id}>の誕生日です:tada:`,
        });

        const channel = await open_birthday_channel(client, guild, channelName);

        if (!channel) {
            continue;
        }

        channel.send({ embeds: [embed] });
    }
};

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
        });

        BirthdayChannelModel.create({ channelId: channel.id });

        return channel;
    } catch (err) {
        logger.error(err);
        return null;
    }
}

/**
 * 既にある誕生日チャンネルをArchive-birthdayに移動し、書き込み権限を削除する。
 * @param {Client} client
 * @param {Guild} guild
 */
async function archive_birthday_channel(client, guild) {
    try {
        const archiveCategoryId = config.birthday.archive_category;
        const roleId = config.birthday.human_role;
        const role = guild.roles.cache.get(roleId);
        const channelIds = await BirthdayChannelModel.distinct("channelId");

        for (const channelId of channelIds) {
            const channel = await guild.channels.fetch(channelId);
            if (!channel) {
                continue;
            }
            if (channel?.type === ChannelType.GuildText) {
                await channel.setParent(archiveCategoryId);
                await channel.permissionOverwrites.edit(role, {
                    SendMessages: false,
                });
            } else {
                logger.warn(
                    `Non-GuildText channels are mixed into the BirthdayChannel schema. type: ${channel?.type}, id: ${channel?.id}`
                );
            }
        }

        await BirthdayChannelModel.deleteMany({});

        // アーカイブカテゴリーのチャンネル上限が近づいたら通知
        const archiveCategory = await guild.channels.fetch(archiveCategoryId);

        if (archiveCategory?.type === ChannelType.GuildCategory) {
            const childrenCount = archiveCategory.children.cache.size;
            if (childrenCount >= 45) {
                const syslogChannel = guild.channels.cache.get(config.syslog.channel);
                if (syslogChannel?.type === ChannelType.GuildText) {
                    const /** @type {string[]} */ owners = config.bot.owner;
                    const mentions = owners.map((ownerId) => `<@${ownerId}>`).join(" ");

                    await syslogChannel.send(
                        `${mentions} :warning::warning::warning:アーカイブカテゴリ内のチャンネル数が${childrenCount}件あります:warning::warning::warning:`
                    );
                }
            }
        } else {
            logger.warn(
                `Archive category is not a GuildCategory. type: ${archiveCategory?.type}, id: ${archiveCategory?.id}`
            );
        }
    } catch (err) {
        logger.error(err);
    }
}
