const cron = require('node-cron')
const seichivote = require("../sub-systems/send-seichi-vote")
const logger = require("../modules/logger")
const config = require("../get-config");

module.exports = (client) => {
    // 投票しろ通知
    cron.schedule('0 0 9 * * *', () => {

        if(!config.seichivote.enable.includes("true")){
            logger.debug("投票通知機能が無効化されているため投票通知は行いません")
            return;
        }
        logger.info("通知をしました！")
        const notification = "<@&" + config.seichivote.role + ">"
        client.channels.cache.get(config.seichivote.channel).send(notification)
        client.channels.cache.get(config.seichivote.channel).send({embeds: [seichivote.embed]})
      })
      client.user.setPresence({status: 'online'})
      client.user.setActivity('ぶおおお', {type: 'PLAYING'});
    // 定期的にステータスを変えてみる
    cron.schedule('0 0 1 * * *', () => {
        client.user.setPresence({status: 'idle'})
        client.user.setActivity('すやすや | ぶおおお', {type: 'PLAYING'});
      })
      cron.schedule('0 0 6 * * *', () => {
        client.user.setPresence({ status: 'online'})
        client.user.setActivity('ぶおおお', {type: 'PLAYING'});
      })
      cron.schedule('0 0 12 * * *', () => {
        client.user.setPresence({status: 'idle'})
        client.user.setActivity('ごはんもぐもぐ | ぶおおお', {type: 'PLAYING'});
      })  
      cron.schedule('0 30 12 * * *', () => {
        client.user.setPresence({status: 'online'})
        client.user.setActivity('ぶおおお', {type: 'PLAYING'});
      })  
}