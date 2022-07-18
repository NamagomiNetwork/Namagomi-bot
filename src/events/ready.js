const cron = require('node-cron')
const logger = require("../modules/logger")
const config = require("../utils/get-config");
const seichi_vote = require('../sub-systems/seichi-vote')
const seichi_achievement = require('../sub-systems/seichi-achievement')
const TawasiModel = require('../utils/Schema/TawasiSchema');

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
    /*
    cron.schedule('0 * * * * *', () => {
      seichi_achievement(client)
    })
    */

    async function one_day_tawasi_reset(){
      const tawasiData = await TawasiModel.findOne({ tawasi: true });
      if (!tawasiData) {
        if (message.content.includes('たわしさん')) {
          logger.warn("たわしさんデータが見つかりませんでした...")
        }
      }else {
        await tawasiData.update({
          tawasi: false,
        })
      }
    }

    cron.schedule('0 0 0 * * *', () => {
      one_day_tawasi_reset()
    })
}