// モジュールの読み込み
const { Client, Intents, Collection, MessageEmbed} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES] });
const config = require('./src/utils/get-config.js');
const cron = require('node-cron')

var nero =  new MessageEmbed({
    title: "今日はでーとだよ♡",
    color: 5301186,
    fields: [
        {
            name: "なまごみとのでーとだけどもうねたよね？",
            value: "寝てないならはやくねようね"
        },
    ]
})
var ohayo =  new MessageEmbed({
    title: "今日はでーとだよ♡",
    color: 5301186,
    fields: [
        {
            name: "おはよ～",
            value: "いるもの最終確認してね \n - えっちなもの \n さめさん \n ででにーのちけっと\n おかね(現金で4万円 ゆびわ,ほてる代以外はくれか) \n だいれーたー \n ふく \n おてがみ \n なまごみにあげるもの(あってからのおたのしみ！)"
        },
        {
            name: "なまごみがくるじかん",
            value: "11:56分 21番新幹線ホーム はやぶさ108号 \n なまごみがすわってるところ: 2号車10番E席"
        },
    ]
})

const mention_1 = "<@927919368665456710>"
const mention_2 = "<@5383085219855728670> <@927919368665456710>"
cron.schedule('0 30 3 13 8 *', () => {
    client.channels.cache.get("975732250085822528").send(mention_1)
    client.channels.cache.get("975732250085822528").send({ embeds: [ nero ] })
  })
  cron.schedule('0 0 8 13 8 *', () => {
    client.channels.cache.get("975732250085822528").send(mention_2)
    client.channels.cache.get("975732250085822528").send({ embeds: [ ohayo ] })
  })
// Discord login
client.login( config.bot.token).catch(err => logger.error(err));