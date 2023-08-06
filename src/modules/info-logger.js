const logger = require('./logger');
const package = require('../utils/get-package');
const os = require('os');

// bot情報
logger.info("=====Bot Status=====")
logger.info("Discord js Version: " + require('discord.js').version)
logger.info("Botバージョン: " + package.version)
logger.info("Repository: https://github.com/NamagomiNetwork/Namagomi-bot")
logger.info("====================")

// 無効化機能を表示する
require('../sub-systems/check-system')

// システム情報

// メモリ
const freemem_byte = os.freemem
const freemem_kb = freemem_byte /1024
const freemem = freemem_kb /1024

// システム情報を送信
logger.info("=====System Status=====")
logger.info("OS情報: " + os.type() + ", " + os.version() + " " + os.arch())
logger.info("空きメモリ: " + freemem + " MB")
logger.info("loadavg(windowsでは正しく表示されません): " + os.loadavg())
logger.info("=======================")