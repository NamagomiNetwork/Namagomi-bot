const config = require('../../../get-config.js');
const { MessageEmbed } = require('discord.js');
const logger = require('../../../modules/logger')
logger.debug("Load message Create Event")
module.exports = (client, message) => {
    if (message.author.bot) return;

  };