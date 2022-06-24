const logger = require('./modules/logger')
logger.debug("Starting Logger.... Done!")
logger.debug('Starting System...')
const { Client, Intents, Collection, MessageEmbed} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES] });
const fs = require("fs");
const package = require('./package.json');
logger.debug("module loading... Done!");

const config = require('./get-config.js');
logger.debug("config Load ... Done!")

client.commands = new Collection();

const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
  logger.debug("Loading event...")
}
logger.debug("Loading event... Done!")

const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);

  client.commands.set(commandName, command);
  logger.debug("Loading command...")
}
logger.debug("Loading command... Done!")


client.login(config.token).catch(err => logger.error(err));
logger.debug('Starting System... Done!')

// バージョン情報等を表示
logger.info("=====Bot Status=====")
logger.info("現在下記のユーザーが登録されています")
logger.info(config.owner)
logger.info("Botバージョン: " + package.version)
logger.info("Repository: https://github.com/NamagomiNetwork/Namagomi-bot")

// 無効化機能を表示する
const checksys = require('./sub-systems/check-system');