const { ChannelType, EmbedBuilder } = require("discord.js");
const ProfileModel = require("../utils/Schema/ProfileSchema");
const color = require("../utils/color-code");
const config = require("../utils/get-config");
const logger = require("../modules/logger");

const birthday_channels = [];

module.exports = async (client) => {
    const now = new Date(
        new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })
    );

    const month = now.getMonth() + 1;
    const day = now.getDate();

    const birthdaysToday = await ProfileModel.find({
        birthday_month: month,
        birthday_day: day,
    });

    await archive_birthday_channel(client);

    for (const birthdayProfile of birthdaysToday) {
        const channelName = birthdayProfile.name + "たん";

        const mention = `<@&${config.birthday.role}>`;

        const embed = new EmbedBuilder({
            title: "誕生日通知",
            color: color.CMD_RUN,
            description: `:tada:今日は <@${birthdayProfile._id}>の誕生日です:tada:`,
        });

        const channel = await open_birthday_channel(client, channelName);

        if(!channel) {
            continue;
        }

        channel.send(mention);
        channel.send({ embeds: [embed] });
    };
}

async function open_birthday_channel(client, channelName) {
    try {
        const categoryId = config.birthday.channel_category;
        if (!categoryId) {
            throw new Error("channel_category not set.");
        }

        const category = await client.channels.fetch(categoryId);
        if (category.type !== ChannelType.GuildCategory) {
            throw new Error("channel_category must be GuildCategory. " + category.type + "is set.");
        }

        const channel = await category.guild.channels.create({
            name: channelName,
            type: ChannelType.GuildText,
            parent: category.id,
        });

        birthday_channels.push(channel)

        return channel;
    } catch (err) {
        logger.error(err);
        return null;
    }
}

// 既にある誕生日チャンネルをArchive-birthdayに移動し、書き込み権限を削除する。
async function archive_birthday_channel(client) {
    try {
        const archiveCategoryId = config.birthday.archive_category;
        if (!archiveCategoryId) {
            throw new Error("archive_category not set.");
        }

        const archiveCategory = await client.channels.fetch(archiveCategoryId);
        if (archiveCategory.type !== ChannelType.GuildCategory) {
            throw new Error(
                "archive_category must be GuildCategory. " + archiveCategory.type + " is set."
            );
        }

        const channels = await Promise.all(birthday_channels);
        for (const channel of channels) {
            if (!channel) {
                continue;
            }
            await channel.setParent(archiveCategory.id);
            await channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
                SendMessages: false,
            });
        }

        birthday_channels.length = 0;
    } catch (err) {
        logger.error(err)
    }
}

