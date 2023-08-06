const logger = require('../modules/logger')
const mongoose = require('mongoose');
const config = require('./get-config');

    mongoose.connect(config.mongodb.url)
    .catch((error) => {
        logger.error("mongodbの接続中にエラーが発生しました...")
        logger.error(error);
        process.exit(1)
    });