const fs = require("fs")

module.exports =  JSON.parse(fs.readFileSync(__dirname + "/../../configs/seichi_achievements.json").toString());
