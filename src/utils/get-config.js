const fs = require("fs");

module.exports = JSON.parse(fs.readFileSync(__dirname + "/../../configs/config.json").toString()) 