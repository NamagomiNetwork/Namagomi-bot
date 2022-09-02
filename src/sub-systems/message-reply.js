const TawasiModel = require('../utils/Schema/TawasiSchema');
module.exports = async (message) => {
    if (tawasiData.one_day_tawasi_feature.includes("faise")) {
        return;
    } else {
        // たわしさん
        const tawasiData = await TawasiModel.findOne({ _id: message.author.id });
        if (!tawasiData) {
            if (message.content.includes('たわしさん')) {
                message.channel.send("1日1たわしさんのデータが存在しません \n コマンドを実行してください")
            }
        } else {
            if (message.content.includes('たわしさん')) {
                if (tawasiData.tawasi.includes("true")) {
                    return;
                }
                message.channel.send("https://i.gyazo.com/90c929eccbec4f36d4b15be295660dce.jpg");
                await tawasiData.updateOne({
                    tawasi: true,
                })
            }
        }
    }
        // 豚
        if (message.content.includes('とってもおいしい豚さん')) {
            message.channel.send("https://i.gyazo.com/2408edaa5c00321c1d726cbae8429bdd.jpg");
        }
}
