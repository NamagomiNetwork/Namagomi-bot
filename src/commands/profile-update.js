const logger = require('../modules/logger')
const config = require('../utils/get-config');
const profileModel = require('../utils/Schema/ProfileSchema');
const { MessageEmbed } = require('discord.js');
const err_embed = require('../utils/error-embed')

exports.run = async (client, message, args) => {

    const profileData = await profileModel.findOne({ _id: message.author.id });

    // profileがあるかどうかを確認
    if (!profileData) {
        message.channel.send(({embeds: [err_embed.main]}))
        message.channel.send("エラー: ユーザープロファイルが見つかりませんでした")
        logger.error("ユーザーID: " + message.author.id + " のプロファイルを確認しようとしましたがプロファイルデータがありませんでした...")
        return;
    }

    try {
        await profileData.updateOne({
            name: message.author.username,
            avatar: message.author.displayAvatarURL({ format: 'png' }),
        })
    } catch (err) {
        message.channel.send(({embeds: [err_embed.main]}))
        logger.error("ユーザーID: " + message.author.id + " のプロファイルの更新に失敗しました...")
        logger.error(err)
        return;
    }
    var data = new MessageEmbed({
        title: "あたらしいprofile",
        description: "DBに保存されているデータを更新しました",
        color: 3853014,
        timestamp: new Date(),
    })
    await message.channel.send(({embeds: [data]}))
}

exports.name = "profile-update";