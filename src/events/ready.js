const cron = require('node-cron')
const logger = require("../modules/logger")
const config = require("../utils/get-config");
const seichi_vote = require('../sub-systems/seichi-vote')
const seichi_achievement = require('../sub-systems/seichi-achievement')
const kagawa_notice = require('../sub-systems/kagawa-notification')
const TawasiModel = require('../utils/Schema/TawasiSchema');
const OmikujiModel = require('../utils/Schema/OmikujiSchema')

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
    
    // 実績通知
    cron.schedule('0 0 0 * * *', () => {
      seichi_achievement(client)
    })
    cron.schedule('0 30 22 * * *', () => {
      seichi_achievement(client)
    })
    
    // 香川通知
    cron.schedule('0 50 19 * * 1-5', () => {
      kagawa_notice(client)
    })
    cron.schedule('0 20 19 * * 0,6', () => {
      kagawa_notice(client)
    })

    async function one_day_tawasi_reset(){
      const tawasiData = await TawasiModel.find({ tawasi: true });
      if (!tawasiData) {
          logger.warn("たわしさんデータが見つかりませんでした...")
          return;
      }else {
        await TawasiModel.updateMany({ tawasi: true }, {$set: { tawasi: false }})
      }
    }
    async function one_day_kuji_reset(){
      const OmikujiData = await OmikujiModel.find({ one_day_omikuji: true });
      if (!OmikujiData) {
          logger.warn("おみくじデータが見つかりませんでした...")
          return;
      }else {
        await OmikujiModel.updateMany({ one_day_omikuji: true }, {$set: { one_day_omikuji: false }})
      }
    }
    cron.schedule('0 0 0 * * *', () => {
      one_day_tawasi_reset()
      one_day_kuji_reset()
    })
}
