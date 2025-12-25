const embed = require("./utils/help-embed");
const sendErrorMessage = require("../modules/error-message");

exports.run = (client, message) => {
    try {
        message.channel.send({ embeds: [embed.page4] });
    } catch (err) {
        sendErrorMessage(err, message);
    }
};

exports.name = "help-4";
