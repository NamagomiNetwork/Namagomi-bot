var log4js = require('log4js');
const config = require('../utils/get-config');
log4js.configure(config.log)
const logger = log4js.getLogger("system");
logger.debug("Load logger module")

module.exports = logger