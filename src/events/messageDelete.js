const logger = require("../modules/logger")
const config = require("../utils/get-config");
const { MessageEmbed } = require('discord.js');

module.exports = (client, message) => {

    if(!config.botlog_system.enable.includes("true")){
        return;
    }
}