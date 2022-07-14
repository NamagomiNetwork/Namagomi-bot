var log4js = require('log4js');
const config = require('../../configs/log4js.json');
log4js.configure(config.log)
const logger = log4js.getLogger("system");
logger.debug("Load logger module")

module.exports = logger