const logger = require('./src/modules/logger')
logger.debug("Starting Logger.... Done!")
logger.debug('Starting System...')

// モジュールの読み込み
const { Client, Intents, Collection, MessageEmbed} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES] });
const fs = require("fs");
client.commands = new Collection();
logger.debug("module loading... Done!");

// configあるかたしかめる
if( fs.existsSync("./configs/config.json") ){
  logger.debug( "configが設定されています...");
}else{
      logger.error("configファイルがありません (config not found) \n ./configs/sample_config.jsonをもとに ./configs/config.json を作成してください")
      logger.error("Error: ENOENT: no such file or directory, open configs/config.json")
      return;
}

const config = require('./src/utils/get-config.js');
logger.debug("config Load ... Done!")

// mongodbに接続
logger.debug("Connected to mongodb")
require('./src/utils/database')

// ファイルの読み込み
const events = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./src/events/${file}`);
  client.on(eventName, event.bind(null, client));
  if(config.debug.enable.includes("true")){
    logger.debug(`Loading Event: ${eventName}`);
  }
}
logger.debug("Loading event... Done!")

const commands = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./src/commands/${file}`);

  client.commands.set(commandName, command);
  if(config.debug.enable.includes("true")){
    logger.debug(`Loading command: ${commandName}`);
  }
}
logger.debug("Loading command... Done!")

// Discord login
client.login( config.bot.token).catch(err => logger.error(err));

logger.debug('Starting System... Done!')
// ログを表示
require("./src/modules/info-logger")