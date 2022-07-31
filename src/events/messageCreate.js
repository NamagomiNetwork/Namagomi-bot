const config = require('../utils/get-config');
const { MessageEmbed } = require('discord.js');
const logger = require('../modules/logger')
const msg_replay = require('../sub-systems/message-reply')
const url = require('../sub-systems/url-show')

// DBSchema
const profileModel = require('../utils/Schema/ProfileSchema');
const BlockUserModel = require('../utils/Schema/BlockUserSchema');
const TawasiModel = require('../utils/Schema/TawasiSchema');
const OmikujiModel = require('../utils/Schema/OmikujiSchema');

module.exports = (client, message) => {
    async function run(){
      // botとDMを無視する
      if (message.author.bot || message.channel.type === 'dm') return;

      // URL展開
      url.discord_com(client, message)
      url.discord_ptb_com(client, message)

      // とあるメッセージに対して画像を送ったりする
      msg_replay(message)

      // profileデータがある場合はDBから ない場合はconfigからprefixを取得する
      const profileData = await profileModel.findOne({ _id: message.author.id });
      if (!profileData) {
        var prefix =  config.bot.prefix
      } else {
        var prefix = profileData.prefix
      }

    // ここから先prefixを持ってない人以外無視する
    if (message.content.indexOf(prefix) !== 0) return;
  
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
            return;
      });;

      logger.info("ユーザー名: " + message.author.username + " ユーザーID: " + message.author.id + "のプロファイル作成に成功しました")
    }
    const tawasiData = await TawasiModel.findOne({ _id: message.author.id });
    // たわしさんprofileがない場合作成
    if (!tawasiData) {
      const tawasi = await TawasiModel.create({
          _id: message.author.id,
          tawasi: false,
      });
      tawasi.save().catch((error) => {
        logger.error("ユーザー名: " + message.author.username + " ユーザーID: " + message.author.id + "のたわしさんプロファイル作成中にエラーが発生しました...")
        logger.error(error);
        return;
    });;

    logger.info("ユーザー名: " + message.author.username + " ユーザーID: " + message.author.id + "のたわしさんプロファイル作成に成功しました")
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
        return;
      });;
      logger.info("ユーザー名: " + message.author.username + " ユーザーID: " + message.author.id + "のブロックプロファイル作成に成功しました")
    }

    // おみくじprofileをつくる
    const OmikujiData = await OmikujiModel.findOne({ _id: message.author.id });
        // ユーザーブロックprofileを作成
    if (!OmikujiData) {
      const omikuji = await OmikujiModel.create({
          _id: message.author.id,
          one_day_omikuji_feature: false,
          one_day_omikuji: false,
          mae_no_omikuji_kekka: "none",
      });
      omikuji.save().catch((error) => {
        logger.error("ユーザー名: " + message.author.username + " ユーザーID: " + message.author.id + "のおみくじプロファイル作成中にエラーが発生しました...")
        logger.error(error);
        return;
      });;
      logger.info("ユーザー名: " + message.author.username + " ユーザーID: " + message.author.id + "のおみくじプロファイル作成に成功しました")
    }

    // 新規作成のときバグる可能性しかないので再取得
    const BlockData_check = await BlockUserModel.findOne({ _id: message.author.id });

    if(BlockData_check.hardblock.includes("true")){
      logger.info("ユーザーID: " + message.author.id + " はハードブロックされています")
      return;
    }
    // ブロックされているか確認
    if(BlockData_check.enable.includes("true")){
      logger.info("ユーザーID: " + message.author.id + " はブロックされています")
      var your_block = new MessageEmbed({
          title: "警告: あなたはブロックされています",
          color: 16601703,
          "footer": {
            "text": "なまごみ"
          },
          fields: [
            {
                name: "おしらせ:",
                value: "あなたはブロックされています"
            },
            {
                name: "お問い合わせ",
                value: "なまごみへ"
            },
          ]
        })
      message.channel.send({embeds: [your_block]})
      return;
    }

      const cmd = client.commands.get(command);
      if (!cmd) return;
      
      // こまんどじっこう
      cmd.run(client, message, args);  
}
run()
};