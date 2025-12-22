const { EmbedBuilder } = require("discord.js");
const logger = require("../modules/logger");
const config = require("../utils/get-config");
const check_admin = require("../utils/check-admin");
const color = require("../utils/color-code");
const sendErrorMessage = require("../modules/error-message");

exports.run = (client, message) => {
    async function send_msg(data) {
        await message.channel.send({ embeds: [data] });
        process.exit(0);
    }
    try {
        const permission_check = check_admin(message, client);

        if (permission_check == "owner: no") {
            return;
        }

        if (config.bot.owner.includes(message.author.id)) {
            logger.info("システムを終了します...");
            const data = new EmbedBuilder({
                title: "システムの終了",
                description: "システムを終了を開始します... \n まもなくbotがシャットダウンします",
                color: color.CMD_RUN,
                timestamp: new Date(),
            });

            send_msg(data);
        }
    } catch (err) {
        sendErrorMessage(err, message);
    }
};

exports.name = "shutdown";
