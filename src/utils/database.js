const logger = require('../modules/logger')
const mongoose = require('mongoose');
const config = require('./get-config');

mongoose 
    .connect(config.mongodb.url).then(() => {
        logger.info("mongodbの接続に成功しました")
        logger.debug("Connected to mongodb ... Done!")
    })
    .catch((error) => {
        logger.error("mongodbの接続中にエラーが発生しました...")
        logger.error(error);
        process.exit(1)
    });