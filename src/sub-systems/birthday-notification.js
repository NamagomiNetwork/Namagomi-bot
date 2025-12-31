const { EmbedBuilder } = require("discord.js");
const ProfileModel = require("../utils/Schema/ProfileSchema");
const color = require("../utils/color-code");

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

    for(const birthdayProfile of birthdaysToday) {
        const embed = new EmbedBuilder({
            title: "誕生日通知",
            color: color.CMD_RUN,
            description: ":tada:今日は" + "<@" + birthdayProfile._id + ">" + "の誕生日です:tada:",
        });

        // const mention = "<@&" + config.birthday_notification.role + ">";
        // client.channels.cache.get("1135407155596496937").send(mention);
        client.channels.cache.get("1135407155596496937").send({ embeds: [embed] });
    };
}
