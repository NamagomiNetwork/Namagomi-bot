const cron = require('node-cron')
const logger = require("../modules/logger")
const config = require("../utils/get-config");
const seichi_vote = require('../sub-systems/seichi-vote')
module.exports = (client) => {
      client.user.setActivity( config.bot.prefix + 'help' + ' | ぶおおお', {type: 'PLAYING'});

    // ステータス
    cron.schedule('0 0 1 * * *', () => {
      client.user.setActivity( config.bot.prefix + 'help' + ' | すやすや', {type: 'PLAYING'});
    })
    cron.schedule('0 0 6 * * *', () => {
      client.user.setActivity( config.bot.prefix + 'help' + ' | ぶおおお', {type: 'PLAYING'});
    })
    cron.schedule('0 0 12 * * *', () => {
      client.user.setActivity( config.bot.prefix + 'help' + ' | ごはんもぐもぐ', {type: 'PLAYING'});
    })  
    cron.schedule('0 30 12 * * *', () => {
      client.user.setActivity( config.bot.prefix + 'help' + ' | ぶおおお', {type: 'PLAYING'});
    })

    // 投票しろ通知
    cron.schedule('0 0 9 * * *', () => {
      seichi_vote(client)
    })
}