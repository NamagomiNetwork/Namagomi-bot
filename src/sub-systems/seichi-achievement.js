const { MessageEmbed} = require('discord.js');
const config = require('../utils/get-config')
const seichi_achievement_embeds = require('./seichi-achievement/embed')
const logger = require('../modules/logger')

module.exports = (client) => {
var today = new Date(); 
var day = today.getMonth() + 1 + "/"+ today.getDate()
const mention = "<@&" + config.seichi_achievement.role + ">"
// 9001
if(day === "1/1"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9001 ] })
}
// 9002
if(day === "12/25"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9002 ] })
}
// 9003
if(day === "12/31"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9003 ] })
}
// 9004
if(day === "4/1"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9004 ] })
}
// 9005
if(day === "2/1"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9005 ] })
}
// 9006
if(day === "2/3"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9006 ] })
}
// 9007
if(day === "2/11"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9007 ] })
}
// 9008
if(day === "2/14"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9008 ] })
}
// 9009
if(day === "3/1"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9009 ] })
}
// 9010
if(day === "3/3"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9010 ] })
}
// 9011
if(day === "3/14"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9011 ] })
}
// 9012
if(day === "3/21"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9012 ] })
}
// 9013
if(day === "4/1"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9013 ] })
}
//9014
if(day === "4/1"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9014 ] })
}
// 9015
if(day === "4/15"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9015 ] })
}
// 9016
if(day === "4/22"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9016 ] })
}
// 9017
if(day === "5/1"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9017 ] })
}
// 9018
if(day === "5/5"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9018 ] })
}
// 9019
if(day === "5/5"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9019 ] })
}
// 9020
if(day === "5/14"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9020 ] })
}
// 9021
if(day === "6/1"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9021 ] })
}
// 9022
if(day === "6/12"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9022 ] })
}
// 9023
if(day === "6/19"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9023 ] })
}
// 9024
if(day === "6/29"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9024 ] })
}
// 9025
if(day === "7/1"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9025 ] })
}
// 9026
if(day === "7/7"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9026 ] })
}
// 9027
if(day === "7/17"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9027 ] })
}
// 9028
if(day === "7/29"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9028 ] })
}
// 9029
if(day === "8/1"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9029 ] })
}
// 9030
if(day === "8/7"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9030 ] })
}
// 9031
if(day === "8/21"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9031 ] })
}
// 9032
if(day === "8/29"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9032 ] })
}
// 9033
if(day === "9/1"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9033 ] })
}
// 9034
if(day === "9/2"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9034 ] })
}
// 9035
if(day === "9/12"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9035 ] })
}
// 9036
if(day === "9/29"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9036 ] })
}
// 9037
if(day === "9/21"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9037 ] })
}
// 9038
if(day === "9/21"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9038 ] })
}
// 9039
if(day === "9/15"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9039 ] })
}
// 9040
if(day === "10/1"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9040 ] })
}
// 9041
if(day === "10/10"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9041 ] })
}
// 9042
if(day === "11/1"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9042 ] })
}
// 9043
if(day === "11/15"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9043 ] })
}
// 9044
if(day === "11/29"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9044 ] })
}
// 9045
if(day === "12/1"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9045 ] })
}
// 9046
if(day === "12/1"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9046 ] })
}
// 9047
if(day === "12/25"){
    client.channels.cache.get(config.seichi_achievement.channel).send(mention)
    client.channels.cache.get(config.seichi_achievement.channel).send({ embeds: [ seichi_achievement_embeds.day_9047 ] })
}
}