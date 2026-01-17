const { Client } = require("discord.js");
const config = require("../utils/get-config");
const logger = require("../modules/logger");
const ProfileModel = require("../utils/Schema/ProfileSchema");

/**
 * @param {Client} client discordクライアント
 * @param {string} userId ユーザーID  
 * 
 * `userId`のユーザーのプロファイルが作成されているか確認し、もしなかったら作成する。
 */
module.exports = async (client, userId) => {
    const profileData = await ProfileModel.findOne({ _id: userId });

    if (!profileData) {
        const user = await client.users.fetch(userId);

        const profile = await ProfileModel.create({
            _id: userId,
            name: user.username,
            avatar: user.displayAvatarURL({ format: "png" }),
            prefix: config.bot.prefix,
            birthday_month: 0,
            birhtday_day: 0,
            birthday_enabled: true,
        });
        profile.save().catch((error) => {
            logger.error(
                "ユーザー名: " +
                    user.username +
                    " ユーザーID: " +
                    userId +
                    "のプロファイル作成中にエラーが発生しました..."
            );
            logger.error(error);
            return;
        });
        logger.info(
            "ユーザー名: " +
                user.username +
                " ユーザーID: " +
                userId +
                "のプロファイル作成に成功しました"
        );
    }
};
