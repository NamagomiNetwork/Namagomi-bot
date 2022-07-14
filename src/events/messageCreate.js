const config = require('../utils/get-config');
const { MessageEmbed } = require('discord.js');
const logger = require('../modules/logger')
const profileModel = require('../utils/Schema/ProfileSchema');
const BlockUserModel = require('../utils/Schema/BlockUserSchema');
const url = require('../sub-systems/url-show')

module.exports = (client, message) => {
    async function run(){
      // Ignore bots
      if (message.author.bot || message.channel.type === 'dm') return;

      // URL展開
      url.discord_com(client, message)
      url.discord_ptb_com(client, message)
      const profileData = await profileModel.findOne({ _id: message.author.id });
      
      if (!profileData) {
        var prefix =  config.bot.prefix
      } else {
        var prefix = profileData.prefix
      }

    //const prefix =  config.bot.prefix
    // Ignore messages not starting with the prefix
    if (message.content.indexOf(prefix) !== 0) return;
  
    
    // Our standard argument/command name definition.
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // ユーザーprofileがない場合作成
      if (!profileData) {
          const profile = await profileModel.create({
              _id: message.author.id,
              name: message.author.username,
              avatar: message.author.displayAvatarURL({ format: 'png' }),
              prefix:  config.bot.prefix,
          });
          profile.save().catch((error) => {
            logger.error("ユーザー名: " + message.author.username + " ユーザーID: " + message.author.id + "のプロファイル作成中にエラーが発生しました...")
            logger.error(error);
      });;

      logger.info("ユーザー名: " + message.author.username + " ユーザーID: " + message.author.id + "のプロファイル作成に成功しました")
    }

    // ユーザーブロックprofileを作成
    const BlockData = await BlockUserModel.findOne({ _id: message.author.id });
    if (!BlockData) {
      const profile = await BlockUserModel.create({
          _id: message.author.id,
          enable: false,
          hardblock: false,
      });
      profile.save().catch((error) => {
        logger.error("ユーザー名: " + message.author.username + " ユーザーID: " + message.author.id + "のブロックプロファイル作成中にエラーが発生しました...")
        logger.error(error);
      });;
      logger.info("ユーザー名: " + message.author.username + " ユーザーID: " + message.author.id + "のブロックプロファイル作成に成功しました")
    }


    // 新規作成のときバグる可能性しかないので再取得
    const BlockData_check = await BlockUserModel.findOne({ _id: message.author.id });
    // ブロックされているか確認
    if(BlockData_check.enable.includes("true")){
      logger.info("ユーザーID: " + message.author.id + " はブロックされています")
      if(BlockData_check.hardblock.includes("true")){
        logger.info("ユーザーID: " + message.author.id + " はハードブロックされています")
      }
      if(!BlockData_check.hardblock.includes("true")){
        var your_block = new MessageEmbed({
            title: "警告: あなたはブロックされています",
            color: 16601703,
            "footer": {
              "text": "なまごみ"
            },
            fields: [
              {
                  name: "ブロック理由",
                  value: "あなたはブロックされています"
              },
              {
                  name: "お問い合わせ",
                  value: "なまごみへ"
              },
            ]
          })
      message.channel.send({embeds: [your_block]})
      }
      return;
    }

      // Grab the command data from the client.commands Enmap
      const cmd = client.commands.get(command);
  
      // If that command doesn't exist, silently exit and do nothing
      if (!cmd) return;
      // Run the command
      cmd.run(client, message, args);  
}
run()
};