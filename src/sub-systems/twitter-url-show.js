const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const logger = require("../modules/logger");
const err_embed = require("../utils/error-embed");
const postExpansionSettingsModel = require("../utils/Schema/PostExpansionSettingsSchema");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function sendVideoFileFromURL(message, embeds, url) {
    // ボットが入力中の状態へ遷移
    const typingPromise = message.channel.sendTyping();

    const response = await axios.get(url, { responseType: "arraybuffer" });

    // OSの一時ディレクトリを基準として、一時ディレクトリを作成
    const tempDirectoryPrefix = path.join(require('os').tmpdir(), 'Namagomi-bot-temp-');
    const tempDirectory = fs.mkdtempSync(tempDirectoryPrefix);
    const tempVideoFilePath = path.join(tempDirectory, "temporary_video.mp4");
    console.log(tempVideoFilePath)
    try {
        // 一時ファイルにデータ書き込み
        fs.writeFileSync(tempVideoFilePath, response.data);
        const attachment = new AttachmentBuilder(tempVideoFilePath);

        // Attachmentとして送信
        await message.channel.send({
            embeds: embeds,
            files: [attachment],
        });
    } catch (ex) {
        logger.error("ファイル送信エラー", ex);
    } finally {
        try{
            fs.unlinkSync(tempVideoFilePath);
        }
        catch(fileDeleteError)
        {
            logger.error("一時ファイル削除エラー",fileDeleteError)
        }
        try
        {
            fs.rmdirSync(tempDirectory);
        }
        catch(directoryDeleteError)
        {
            logger.error("一時ディレクトリ削除エラー", directoryDeleteError)
        }
        // ボットが入力完了の状態へ遷移
        typingPromise;
    }
}

exports.x_twitter_com = async (client, message) => {
    const postExpansionSettingsData = await postExpansionSettingsModel.findOne({ _id: message.author.id });
    if (!postExpansionSettingsData) {
        message.channel.send({ embeds: [err_embed.main] });
        logger.error(
            "ユーザーID: " +
                message.author.id +
                " のTwitter投稿展開機能を設定しようとしましたがプロファイルデータがありませんでした..."
        );
        return;
    }

    if (postExpansionSettingsData.x_twitter_show.includes("false")) return;

    // X or TwitterのツイートURLがスポイラー(||)・不等号囲い(<>)・インラインコードブロック(``)・引用(>)されている時は埋め込み展開しない
    const ignoreSymbols = /\|\||<|`|>/;
    if (message.content.match(ignoreSymbols)) return;

    const mentionPostRegex = /[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠]*/;
    const mentionPostResult = message.content.match(mentionPostRegex);
    if (mentionPostResult[0]) return;

    const urlRegex = /https:\/\/(twitter\.com|x\.com)\/[A-Za-z0-9_]*\/status\/(\d+)/;
    const urlRegexResults = message.content.match(urlRegex);
    if (!urlRegexResults) return;

    let replaceURL = urlRegexResults[0].replace(/twitter.com|x.com/, "api.vxtwitter.com");
    fetch(replaceURL)
        .then((res) => res.json())
        .then(async (post) => {
            const embeds = [];
            let attachment;
            const embed = new EmbedBuilder({
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
                    await sendVideoFileFromURL(message, embeds, attachment);
                }
            }
        });
    const delayMS = 10;
    setTimeout(() => {
        message.delete();
    }, delayMS);
};
