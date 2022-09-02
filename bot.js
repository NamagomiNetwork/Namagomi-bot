const logger = require('./src/modules/logger')
logger.info('Botを起動中です...')

// モジュールの読み込み
const { Client, Intents, Collection, MessageEmbed} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES] });
const fs = require("fs");
client.commands = new Collection();
logger.info("外部モジュールの読み込みが完了しました");

// configあるときだけ読み込む
if(!fs.existsSync("./configs/config.json") ){
      logger.error("configファイルがありません (config not found) \n ./configs/sample_config.jsonをもとに ./configs/config.json を作成してください")
      logger.error("Error: ENOENT: no such file or directory, open configs/config.json")
      return;
}

const config = require('./src/utils/get-config.js');
logger.info("configの読み込みに成功しました")

// ログをデバッグモード時には細かいものを出力する
function debug_logger(msg){
  if(config.debug.enable.includes("true")){
    logger.debug(msg)
  }
}

// mongodbに接続
debug_logger("Connected to mongodb")
logger.info("データベースへの接続を開始します")
require('./src/utils/database')

// ファイルの読み込み
const events = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./src/events/${file}`);
  client.on(eventName, event.bind(null, client));
  debug_logger("Loading Event: " + eventName)
}
logger.info("イベントの読み込みに成功しました")

const commands = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./src/commands/${file}`);

  client.commands.set(commandName, command);
  debug_logger("Loading command: " + commandName)
}
logger.info("コマンドの読み込みに成功しました")

// Discord login
client.login( config.bot.token).catch(err => logger.error(err));

// ログを表示
require("./src/modules/info-logger")